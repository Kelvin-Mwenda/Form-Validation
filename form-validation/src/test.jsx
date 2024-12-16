import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function test() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',    
    phone: '',
    password:'',
    confirmPassword:'',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({ firstName: '', lastName: '', email: '', phone: '',password: '',confirmPassword: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={formData.email} 
          onChange={handleChange}/>
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </Form.Group>
        

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First name" value={formData.firstName} 
          onChange={handleChange}/>
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </Form.Group>
        

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last name" value={formData.lastName} 
          onChange={handleChange}/>
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </Form.Group>
        

        <Form.Group className="mb-3" controlId="formBasicContact">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Phone number" value={formData.phone} 
          onChange={handleChange}/>
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </Form.Group>
        

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={formData.password} 
          onChange={handleChange}/>
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={formData.confirmPassword} 
          onChange={handleChange}/>
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}