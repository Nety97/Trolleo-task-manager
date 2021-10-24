// import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import Footer from './Footer'
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

function Home() {
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden'}}>
         
            <div className='image'>
                <Fade bottom>
                    <h1 className='titleHome'>TROLLEO</h1>
                </Fade>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                <div>
                    <Fade left>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/4149/4149646.png" />
                            <Card.Body>
                                <Card.Title>Manage your tasks</Card.Title>
                                <Card.Text>
                                    When you have so many task and you dont know where to start, we are here for you!
                                </Card.Text>
                            
                            </Card.Body>
                        </Card>
                    </Fade>
                </div>
                <div>
                    <Fade left>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/4753/4753192.png" />
                            <Card.Body>
                                <Card.Title>Save Time</Card.Title>
                                <Card.Text>
                                    You always have your tasks close so no more wasting time thinking what you have to do.
                                </Card.Text>
                            
                            </Card.Body>
                        </Card>
                    </Fade>
                </div>
                <div>
                    <Fade left>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/2799/2799195.png" />
                            <Card.Body>
                                <Card.Title>Control your Workflow</Card.Title>
                                <Card.Text>
                                    Being organized will help you increase you productivity. <br/>Say tanks later.
                                </Card.Text>
                            
                            </Card.Body>
                        </Card>
                    </Fade>
                </div>
            </div>
            <div className='someText'>
                <h2>Its not just Work. Its a way of Working.</h2>
                <h5>
                    Create many tables and tasks as you want. <br/> Organize them by status: To do, In progress and Done. <br/> 
                    Try out. Its free!
                </h5>
                <Flip right>
                    <Link style={{marginTop: '25px'}} to='/register' className='margin Mybtn'>Let's Start</Link>
                </Flip>
            </div>
            <Footer/>
        </div>     
    )
}

export default Home