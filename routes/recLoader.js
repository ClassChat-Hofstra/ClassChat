require('dotenv').config();
const axios = require("axios");
const {
    TextAnalyticsClient,
    AzureKeyCredential
} = require("@azure/ai-text-analytics");
const {
    log
} = require("console");

const https = require('https')
const key = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT;
const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY;
if (!SUBSCRIPTION_KEY) {
    throw new Error('AZURE_SUBSCRIPTION_KEY is not set.')
}

const textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

async function entityRecognition(client, messages) {

    let keywords = new Set();
    // const entityInputs = [
    //     "Do you guys have any idea how to code in JavaScript or React i'm still learning and not that good at it.",
    //     "I'm still learning how to implement a linked list in java"
    // ];
    const entityInputs = messages;
    const entityResults = await client.recognizeEntities(entityInputs);

    entityResults.forEach(document => {
        // console.log(`Document ID: ${document.id}`);
        document.entities.slice(0, 2).forEach(entity => {
            //console.log(`\tName: ${entity.text} \tCategory: ${entity.category} \tSubcategory: ${entity.subCategory ? entity.subCategory : "N/A"}`);
            //console.log(`\tScore: ${entity.confidenceScore}`);
            keywords.add(entity.text);
        });
    });
    return keywords;
}


async function bingWebSearch(query) {
    const connection = 'https://api.bing.microsoft.com' + '/v7.0/search?q=' + encodeURIComponent(query) + "&count=2";
    const headers = {
        'Ocp-Apim-Subscription-Key': "17ee06fa76e3444fa5fc06c4ce94e100"
    }
    try {
        var recs = {};
        var body = '';

        const request = await axios.get("https://api.bing.microsoft.com/v7.0/search?q=" + encodeURIComponent(query) + "&count=2", {
            headers: headers
        })
        body += JSON.stringify(request.data);
        recs.webRecs = handleWebResults(JSON.parse(body));
        recs.videoRecs = handleVideoResults(JSON.parse(body));
        return recs;
    } catch (e) {
        console.error(e);
    }


}

function handleWebResults(jsonObject) {
    var webPageValues = jsonObject.webPages.value;
    var results = [];
    webPageValues.forEach(obj => {
        results.push({
            name: obj.name,
            snippet: obj.snippet,
            url: obj.displayUrl
        })
    });
    //console.log(results);
    return results;
}

function handleVideoResults(jsonObject) {
    var videoValues = jsonObject.videos.value;
    var results = [];
    if (videoValues.length > 0) {
        var videoObj = videoValues[0];
        var newLink = videoObj.contentUrl;
        // if (videoObj.embedHtml.includes("autoplay=1")) {
        //     newLink = videoObj.embedHtml.replace("autoplay=1", "autoplay=0");
        // }
        if (videoObj.contentUrl.includes("youtube.com/watch")) {
            newLink = videoObj.contentUrl.replace("watch?v=", "embed/");
        }
        results.push({
            name: videoObj.name,
            embedHtml: newLink
        })
        //console.log(results);
        return results;
    }

};

async function loadKeywords(keywords) {
    try {
        const recsArr = [];
        async function mapKeywords(keyword) {
            const request = await bingWebSearch(keyword);
            recsArr.push(request);
        }
        await Promise.all(keywords.map(mapKeywords));
        return recsArr;
    } catch (e) {
        console.log(e);
        return [];
    }
}

module.exports = async (messages) => {
    try {
        var keywords = await entityRecognition(textAnalyticsClient, messages);
        var recs = loadKeywords(Array.from(keywords));
        return recs;
    } catch (e) {
        console.error(e);
    }

}