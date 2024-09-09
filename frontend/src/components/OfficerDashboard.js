import React , {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import authService from "../services/authService";
import styled from 'styled-components';
function OfficerDashboard (){
    const [services, setServices] = useState([
        { id: 1, name: 'Income Tax Certificate', formFields: [] },
        { id: 2, name: 'Caste Certificate', formFields: [] },
        { id: 3, name: 'Land Certificate', formFields: [] },
      ]);
      const [selectedService, setSelectedService] = useState(null);
      const [newField, setNewField] = useState('');
      const [hierarchy, setHierarchy] = useState({});
      const navigate = useNavigate();
    
      useEffect(() => {
        const token = authService.getToken();
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);
    
      const addFieldToForm = () => {
        if (newField && selectedService) {
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.id === selectedService.id
                ? { ...service, formFields: [...service.formFields, newField] }
                : service
            )
          );
          setNewField('');
        }
      };
    
      const updateHierarchy = (level, value) => {
        setHierarchy((prevHierarchy) => ({
          ...prevHierarchy,
          [level]: value,
        }));
      };
    
      const renderServices = () => {
        return services.map((service) => (
          <ServiceButton key={service.id} onClick={() => setSelectedService(service)}>
            {service.name}
          </ServiceButton>
        ));
      };
    
      const renderSelectedService = () => {
        if (!selectedService) return <p>Please select a service to customize.</p>;
    
        return (
          <CustomizationContainer>
            <h2>Customizing: {selectedService.name}</h2>
            <h3>Form Fields:</h3>
            <ul>
              {selectedService.formFields.map((field, index) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
            <FieldInput
              type="text"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              placeholder="Enter a new field"
            />
            <AddFieldButton onClick={addFieldToForm}>Add Field</AddFieldButton>
    
            <HierarchyContainer>
              <h3>Set Hierarchy Levels:</h3>
              {['User', 'Verifier', 'Reviewer', 'Certifier'].map((level) => (
                <div key={level}>
                  <label>{level}: </label>
                  <HierarchyInput
                    type="text"
                    value={hierarchy[level] || ''}
                    onChange={(e) => updateHierarchy(level, e.target.value)}
                    placeholder={`Set ${level}`}
                  />
                </div>
              ))}
            </HierarchyContainer>
    
            <SaveButton onClick={() => alert('Customizations saved successfully.')}>
              Save Customizations
            </SaveButton>
          </CustomizationContainer>
        );
      };
    
      return (
        <DashboardContainer>
          <Title>Officer Dashboard</Title>
          <ServiceList>
            <h3>Services:</h3>
            {renderServices()}
          </ServiceList>
    
          {renderSelectedService()}
        </DashboardContainer>
      );
};
export default OfficerDashboard;
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  font-size: 36px;
  margin-bottom: 20px;
`;

const ServiceList = styled.div`
  width: 80%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ServiceButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CustomizationContainer = styled.div`
  width: 80%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FieldInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const AddFieldButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const SaveButton = styled.button`
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #138496;
  }
`;

const HierarchyContainer = styled.div`
  margin-top: 20px;
`;

const HierarchyInput = styled.input`
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;