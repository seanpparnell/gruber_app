import { Form, Button, Row, Col, Image, Container, Card } from 'react-bootstrap';
import { ServiceConsumer } from '../../providers/ServiceProvider';
import { useState, useEffect, useReducer } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import PriceForm from '../shared/PriceForm';
import { FormControl, PriceFormCon, SBSButton, SRow, LButton } from '../styles/Styles';
import dog from '../../components/styles/images/form_images/dog.png'
import cat from '../../components/styles/images/form_images/cat.png'
import nopets from '../../components/styles/images/form_images/nopets.png'
import lastcut1 from '../../components/styles/images/form_images/lastcut1.png'
import lastcut2 from '../../components/styles/images/form_images/lastcut2.png'
import lastcut3 from '../../components/styles/images/form_images/lastcut3.png'
import knockitdown from '../../components/styles/images/form_images/knockitdown.png'
import neat from '../../components/styles/images/form_images/neat.png'
import perfect from '../../components/styles/images/form_images/perfect.png'
import shrub from '../../components/styles/images/form_images/shrub.png'
import weeds from '../../components/styles/images/form_images/weeds.png'
import leaf from '../../components/styles/images/form_images/leaf.png'
import mulching from '../../components/styles/images/form_images/mulching.png'
import turf from '../../components/styles/images/form_images/turf.png'


import '../styles/App.css';
import Flash from '../shared/Flash';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)



const ServiceForm = ({ addService, setAdd, updateService, flash, setFlash }) => {
  const [service, setService] = useState({ lawn_size: null, service_type: '', frequency: '', sdate: '', stime: '', service_image: null, complete: false })

  const [formVals, setFormVals] = useState({pets: '', lastcut: '', details: '', additions: '', frequency: ''})

  const [note, setNote] =useState({body: ''})
  
  const [file, setFile] = useState()

  // const [invoice, setInvoice] = useState({price: 0})

  const location = useLocation()
  const { serviceId } = useParams()
  
  useEffect( () => {
    if (serviceId) {
      const { lawn_size, service_type, frequency, sdate, stime, service_image, complete } = location.state
      setService({ lawn_size, service_type, frequency, sdate, stime, service_image, complete })
    }
    return () => {
      setFlash(null)
    }
  }, [])

  const handleFileUpdate = (fileItems) => {
    if (fileItems.length !== 0) {
      setFile(fileItems)
      setService({ ...service, service_image: fileItems[0].file });
    }
  }

  const handleFileRemoved = (e, file) => {
    setFile(null)
    setService({ ...service, service_image: null });
  }

  const handleSubmit = (e) => {

    e.preventDefault()
    if (serviceId) {
      updateService(serviceId, service)
    } else {
      // setInvoice({price: CalcPets() + CalcLastCut() + CalcFreq() + CalcDetails() + CalcAdditions()})
      
      addService(service, note, {price: CalcLawnSize() + CalcPets() + CalcLastCut() + CalcFreq() + CalcDetails() + CalcAdditions() })
      // setAdd(false)
    }
    setService({...service, image: null})
    // ({ lawn_size: '', service_type: '', frequency: '', sdate: '', stime: '', service_image: null, complete: false })
  }

// Calculating price from form

  const CalcLawnSize = () => {
    return service.lawn_size * .10
    
  }

  const CalcPets = () => {
    if (formVals.pets === 'dogs') {
      return 10
    } else if (formVals.pets === 'cats') {
      return 5
    } else {
      return 0
    }
  }

  const CalcLastCut = () => {
    if (formVals.lastcut === '1 week ago') {
      return 5
    }
    else if (formVals.lastcut === '2 weeks ago') {
      return 10
    } else {
      return 15
    } 
  }

  const CalcFreq = () => {
    if (formVals.frequency === 'once a week') {
      return 10
    }
    else if (formVals.frequency === 'twice a week') {
      return 5
    }
    else {
      return 0
    }
  }

  const CalcDetails = () => {
    if (formVals.details === 'perfect') {
      return 10
    }
    else if (formVals.details === 'neat') {
      return 5
    }
    else {
      return 0
    }
  }

  const CalcAdditions = () => {
    if (formVals.additions === 'pruning') {
      return 1
    }
    else if (formVals.additions === 'pulling') {
      return 2
    }
    else if (formVals.additions === 'leaf removal') {
      return 3
    }
    else if (formVals.additions === 'mulching') {
      return 4
    }
    else {
      return 5
    }
  }



  return (
    <>
     
      <Row>
      <h1 className='s-title'>{ serviceId ? 'Update' : 'Create' } Service</h1>
      </Row>
      <Form onSubmit={handleSubmit}>

        

        <PriceFormCon>
        <Row>
          <h2>Want the Best lawn mowing prices possible?</h2>
          
          <p>Add more details about your yard for the best lawn mowing prices possible</p>
        </Row>

        <Col md="4">
          <FilePond 
              files={file}
              onupdatefiles={handleFileUpdate}
              onremovefile={handleFileRemoved}
              allowMultiple={true}
              name='service_image'
              labelIdle='Drag and Drop your files or <span className="filePond--label-action">
                Browse
                </span>  
              '
          />
        </Col>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Lawn Size</Form.Label>
              <Form.Control 
                name='lawn_size'
                value={service.lawn_size}
                onChange={(e) => setService({...service, lawn_size: e.target.value })}
                type="number" 
                placeholder="sq ft." 
                required
              />
            </Form.Group>
          </Col>
         
        </Row>
        
        
          <Row>
            <Form.Group className="mb-3">
              <Form.Label><h5>1. Pick the day you want your lawn cut</h5></Form.Label>
              <Form.Control
                name='sdate'
                value={service.sdate}
                onChange={(e) => setService({...service, sdate: e.target.value })}
                type="date"
                required
                // getSelectedDay={formVals.sdate}
                endDate={100}
                selectDate={new Date("2020-04-30")}
                labelFormat={"MMMM " + "yyyy"}
                color={"orange"}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  name='stime'
                  value={service.stime}
                  onChange={(e) => setService({...service, stime: e.target.value })}
                  type="time"
                  placeholder="Time"
                  required
                />
              </Form.Group>
          </Row>
            
            
         
          
          <Form.Group className="mb-3" >
            
            <Row><Form.Label><h5>2. Do you have outdoor pets?</h5></Form.Label> <br></br></Row>
              <Row>
                <Col>
                  <Image src={dog} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<p>DOGS</p>}
                  name='pets'
                  value={formVals.pets}
                  onChange={(e) => setFormVals({...formVals, pets: 'dogs' })}
                  type="radio"
                  required
                  />
                </Col>


                <Col>
                  <Image src={cat} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<p>CATS</p>}
                  name='pets'
                  value={formVals.pets}
                  onChange={(e) => setFormVals({...formVals, pets: 'cats' })}
                  type="radio"
                  required
                  />
                </Col>
                <Col>
                  <Image src={nopets} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<p>NO PETS</p>}
                  name='pets'
                  value={formVals.pets}
                  onChange={(e) => setFormVals({...formVals, pets: 'no pets' })}
                  type="radio"
                  required
                  />
                </Col>
              </Row>
          </Form.Group>
          
                 
          <Form.Group className="mb-3">

              <Row><Form.Label><h5>3. When was your last cut?</h5></Form.Label></Row>
              <Row>
                <Col>
                  <Image src={lastcut1} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<h6>1 Week Ago</h6>}
                  name='lastcut'
                  value={formVals.lastcut}
                  onChange={(e) => setFormVals({...formVals, lastcut: '1 week ago' })}
                  type="radio"
                  required
                  />
                </Col>
                <Col>
                  <Image src={lastcut2} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<h6>2 Weeks Ago</h6>}
                  name='lastcut'
                  value={formVals.lastcut}
                  onChange={(e) => setFormVals({...formVals, lastcut: '2 weeks ago' })}
                  type="radio"
                  required
                  />
                </Col>
                <Col>
                  <Image src={lastcut3} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<h6>3 Weeks Ago</h6>}
                  name='lastcut'
                  value={formVals.lastcut}
                  onChange={(e) => setFormVals({...formVals, lastcut: '3 weeks ago' })}
                  type="radio"
                  required
                  />
                </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><h5>4. If the first mowing goes well... How often do you want service?</h5></Form.Label>
            <Form.Check
              label={<p>Once a week</p>}
              // label={<h6>One Week Ago</h6>}
              name='frequency'
              value={formVals.frequency}
              onChange={(e) => setFormVals({...formVals, frequency: 'once a week' })}
              type="radio"
              required
              />
              <Form.Check
              label={<p>Twice a week</p>}
              name='frequency'
              value={formVals.frequency}
              onChange={(e) => setFormVals({...formVals, frequency: 'twice a week' })}
              type="radio"
              required
              />
              <Form.Check
              label={<p>Just this once</p>}
              name='frequency'
              value={formVals.frequency}
              onChange={(e) => setFormVals({...formVals, frequency: 'just this once' })}
              type="radio"
              required
              />
          </Form.Group>

          <Form.Group className="mb-3">

              <Row><Form.Label><h5>5. Let your bidders know the level of mowing detail you???re expecting</h5></Form.Label></Row>
              <Row>
                <Col>
                  <Image src={knockitdown} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<h6>Just knock it down</h6>}
                  name='details'
                  value={formVals.details}
                  onChange={(e) => setFormVals({...formVals, details: 'knock it down' })}
                  type="radio"
                  required
                  />
                </Col>
                <Col>
                  <Image src={neat} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<h6>I like the lawn neat</h6>}
                  name='details'
                  value={formVals.details}
                  onChange={(e) => setFormVals({...formVals, details: 'neat' })}
                  type="radio"
                  required
                  />
                </Col>
                <Col>
                  <Image src={perfect} roundedCircle width='109px' height='109px'></Image>
                  <Form.Check
                  label={<h6>I want it to be perfect</h6>}
                  name='details'
                  value={formVals.details}
                  onChange={(e) => setFormVals({...formVals, details: 'perfect' })}
                  type="radio"
                  required
                  />
                </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">

            <Row><Form.Label><h5>6. Are you in terested in any other yard work in addition to weekly mowing? (can be added later alaster after first mowing</h5></Form.Label></Row>
            <Row>
              <Col>
                <Image src={shrub} roundedCircle width='109px' height='109px'></Image>
                <Form.Check
                label={<h6>Shrub Pruning</h6>}
                name='additions'
                value={formVals.additions}
                onChange={(e) => setFormVals({...formVals, additions: 'pruning' })}
                type="radio"
                required
                />
              </Col>
              <Col>
                <Image src={weeds} roundedCircle width='109px' height='109px'></Image>
                <Form.Check
                label={<h6>Pulling / Spray Weeds</h6>}
                name='additions'
                value={formVals.additions}
                onChange={(e) => setFormVals({...formVals, additions: 'pulling' })}
                type="radio"
                required
                />
              </Col>
              <Col>
                <Image src={leaf} roundedCircle width='109px' height='109px'></Image>
                <Form.Check
                label={<h6>Leaf Removal</h6>}
                name='additions'
                value={formVals.additions}
                onChange={(e) => setFormVals({...formVals, additions: 'leaf removal' })}
                type="radio"
                required
                />
              </Col>
              <Col>
                <Image src={mulching} roundedCircle width='109px' height='109px'></Image>
                <Form.Check
                label={<h6>Re-mulching of Beds</h6>}
                name='additions'
                value={formVals.additions}
                onChange={(e) => setFormVals({...formVals, additions: 'mulching' })}
                type="radio"
                required
                />
              </Col>
              <Col>
                <Image src={turf} roundedCircle width='109px' height='109px'></Image>
                <Form.Check
                label={<h6>Turf Seeding</h6>}
                name='additions'
                value={formVals.additions}
                onChange={(e) => setFormVals({...formVals, additions: 'seeding' })}
                type="radio"
                required
                />
              </Col>
            </Row>
            </Form.Group>
          
          <Row>
            <Form.Group className="mb-3">
              <Form.Label><h5>7. Now... Add the important details your lawn person should know</h5></Form.Label>
              <FormControl
                name='note'
                value={note.body}
                onChange={(e) => setNote({...note, body: e.target.value })}
                type="text"
                placeholder="I have a HUGE dog. Don't mow the backyard or else die."
                required
            
              />
            </Form.Group>
          </Row>

     

        <p>Your intial set of quotes will be for mowing only. After the 1st mow you can add Shrub Pruning or other services. but not yet at this step</p>
        
          <SBSButton variant="primary" type="submit">
                    Submit
                  </SBSButton>

      </PriceFormCon>

        
      </Form>
    </>
  )
}

const ConnectedServiceForm = (props) => (
  <ServiceConsumer>
    { value => <ServiceForm {...value} {...props} /> }
  </ServiceConsumer>
)



export default ConnectedServiceForm;