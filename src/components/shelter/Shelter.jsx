import React from 'react';
import ShelterImage from '../../assets/images/shelterImages/HRS.png';
import './Shelter.css';
import LeftArrow from '../LeftArrow.jsx';
const Shelter = () => {
  return (
    <div className="org">
      <LeftArrow/>

      <div className='shelter-container'>
          <h1 className="org-title">House Rabbit Society</h1>

          <figure className="org-hero">
            <img src={ShelterImage} alt="Exterior view of the House Rabbit Society building"  className='shelterImage'/>
          </figure>

          {/* Contact Info */}
          <div className="org-contact">
            <div className="row">
              <span className="label"><p>Email</p></span>
              <a className="value" href="mailto:foster@houserabbit.org">foster@houserabbit.org</a>
            </div>
            <div className="row">
              <span className="label"><p>Phone</p></span>
              <a className="value" href="tel:+15109707575">(510) 970-7575</a>
            </div>
            <div className="row">
              <span className="label"><p>Location</p> </span>
              <address className="value">
                148 Broadway, Richmond,<br />
                CA 94804
              </address>
            </div>
          </div>

          <div className="org-body">
            <p>
              At our shelter, we deeply value the guidance and support provided by the House Rabbit Society. As a national nonprofit, HRS has been instrumental in shaping how we care for and advocate for our rabbits. Their emphasis on treating rabbits as indoor companions—rather than outdoor pets or livestock—aligns closely with our own mission. We often rely on their resources for best practices in nutrition, bonding, litter training, and medical care. Their educational materials help us inform adopters and debunk common myths about rabbit ownership. Thanks to HRS, we’re better equipped to give our bunnies the safe, loving homes they deserve.
            </p>
          </div>

      </div>

    </div>
  );
};

export default Shelter;
