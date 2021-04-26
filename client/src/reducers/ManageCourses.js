import axios from "axios";


const ManageCoursesReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_COURSE":
            return [...state, action.payload];
        case "REMOVE_COURSE":
            return state.filter(course => course.crn !== action.payload);
        case "LOAD_COURSES":
            return action.payload;
        case "UPDATE_MESSAGES": {
            const courseToUpdate = state.find((course) => course.crn === action.payload.crn);
            const filteredState = state.filter(course => course.crn !== action.payload.crn);

            if (courseToUpdate !== undefined && filteredState !== undefined) {
                courseToUpdate.messages.push(action.payload.message);
                console.log(courseToUpdate);
                console.log(filteredState);
                return [...filteredState, courseToUpdate];
            }
            return state;
        }
        case "UPDATE_MESSAGE_REACTIONS": {
            console.log(action.payload);
            // const courseToUpdate = state.find((course) => course.crn === action.payload.crn);
            // const filteredState = state.filter(course => course.crn !== action.payload.crn);
            // const messageToUpdate = courseToUpdate.messages.find((message) => {
            //     return message._id === action.payload.id
            // })
            // messageToUpdate.reactions.push(action.payload.reaction);
            // console.log(messageToUpdate);

            const newState = state.map((course) => {
                if (course.crn === action.payload.crn) {
                    course.messages.map((message) => {
                        // message.reactions.push({
                        //     emoji: "👍",
                        //     emojiName: "thumbs up sign",
                        //     count: 1
                        // });
                        if (message._id === action.payload.id) {
                            message.reactions.push(action.payload.reaction);
                        }
                        return message;
                    })
                }
                return course;
            })

            //console.log(test);

            return newState;
        }

        case "UPDATE_REACTION_CLICK": {
            console.log(action.payload);

            //console.log(onReaction());

            return state;
        }

        case "PIN_POST":
            console.log(action);
            return (state.map((course) => {
                if (course.crn === action.payload.crn) {
                    course.pinnedPosts.push(action.payload.messageObject);
                }
                return course;
            }))

        default:
            return state;
    }


    function onReaction(emojiName, currentUser, messageID) {
        const currentCourse = state.find((course) => {
            return course.crn === state.selectedChat.crn;
        });

        // console.log(currentCourse.messages);

        const currentMessage = currentCourse.messages.find((message) => {
            return message._id === messageID;
        });

        return currentMessage.reactions.filter((emojiObject) => {
            if (emojiObject.emojiName === emojiName) {
                if (emojiObject.senders.has(currentUser.email)) {
                    emojiObject.count -= 1;

                    emojiObject.senders.delete(currentUser.email);
                } else {
                    emojiObject.count += 1;
                    emojiObject.senders.add(currentUser.email);
                }
            }

            if (emojiObject.count > 0) {
                return emojiObject;
            } else {}
        })
    }


}



export default ManageCoursesReducer;