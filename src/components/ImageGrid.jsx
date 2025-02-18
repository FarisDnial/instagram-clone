import { useState } from "react";
import { Button, Col, Image, Nav, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdatePostModal from "./UpdatePostModal";
import ImagePostModal from "./ImagePostModal";
import DeleteModal from "./DeleteModal";

export default function ImageGrid() {
    const posts = useSelector((state) => state.posts);
    const [show, setShowModal] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    const handleClose = () => {
        setCurrentPost(null);
        setShowModal(false);
    };

    const handleShow = (post) => {
        setCurrentPost(post);
        setShowModal(true);
    };

    const handleImagePost = (post) => {
        setCurrentPost(post);
        setShowModal(true)
    }


    const renderImages = () => {
        return posts.map((post) => (
            <Col md={4} key={post.id} className="mb-4">
                <Image src={post.image} fluid onClick={() => handleImagePost(post)} />
                <Button onClick={() => handleShow(post)} variant="outline-primary">
                    <i className="bi bi-pencil-square"></i>
                </Button>

                <DeleteModal post={post} />

            </Col>
        ));
    }

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <hr id="divider" />
                <Col className="d-flex justify-content-center mb-3">
                    <Nav.Link eventKey="first" className="me-5">
                        <i className="bi bi-grid-3x3 me-2"></i>POSTS
                    </Nav.Link>
                    <Nav.Link eventKey="second" className="me-5">
                        <i className="bi bi-collection-play me-2"></i>REELS
                    </Nav.Link>
                    <Nav.Link eventKey="third" className="me-5">
                        <i className="bi bi-person-square me-2"></i>TAGGED
                    </Nav.Link>
                </Col>

                <Tab.Content>
                    <Tab.Pane eventKey="first" style={{ margin: 15 }}>
                        <Row>{renderImages()}</Row>
                        {currentPost && (
                            <UpdatePostModal
                                show={show}
                                handleClose={handleClose}
                                postId={currentPost.id}
                            />
                        )}
                        {currentPost && (
                            <ImagePostModal
                                show={show}
                                handleClose={handleClose}
                                postId={currentPost.id}
                            />
                        )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className="text-center" style={{ margin: 100 }}>
                        Nothing to show here at the moment
                    </Tab.Pane>
                    <Tab.Pane eventKey="third" className="text-center" style={{ margin: 100 }}>
                        Nothing to show here at the moment
                    </Tab.Pane>
                </Tab.Content>
            </Row>
        </Tab.Container>
    );
}