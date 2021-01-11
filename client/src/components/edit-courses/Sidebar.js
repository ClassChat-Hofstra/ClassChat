import React from 'react'
import { Col, ListGroup, ListGroupItem, Nav } from 'react-bootstrap'

export default function sidebar() {
    return (
        <Col className="col-md-2 d-none d-md-block bg-light sidebar">
            <Nav>
            <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="home"></span>
                  Course 1
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file"></span>
                  Course 2
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="shopping-cart"></span>
                  Course 3
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="users"></span>
                  Course 4
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Course 5
                </a>
              </li>
            </ul>

          </div>
            </Nav>
        </Col>
    )
}
