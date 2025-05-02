import React,{useState, useEffect } from "react";
import styles from "./Listing.module.css";

import axios from "axios";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from "react-router-dom";
const supabaseUrl="https://zjykslrwatdswliluzul.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqeWtzbHJ3YXRkc3dsaWx1enVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjY2NzAsImV4cCI6MjA1Mzg0MjY3MH0.KO_-dvMlj4KceFkTjd0Bb6OG3ZdI_EkZGjmuXXvDF5o"
const supabase = createClient(supabaseUrl, supabaseKey);

function Listing() {

   const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
      propertyName: "",
      price: "",
      address:{
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      },images:[],
      location: [],
      registrationCopy: null,
      bluePrintCopy: null,
      numOfRooms: "",
      numOfBathRoom: "",
      numOfKitchen: "",
      numOfBalcony: "",
      numOfOther: "",
      propertyArea: "",
      propertyFurnished: "",
      propertyConstructionYear: "",
      features: [],
      propertyFacing: "",
      // propertyTransactionType: "",
      propertyResale: "",
      propertyStatus: "",
      propertyType: "",
      propertySellerIdType: "",
      propertySellerId: "",
      propertyDescription1: "",
      propertyDescription2: "",
      owner:localStorage.getItem('userId'),
      residentialType: ""
    });
    
  
   // Handle file selection
   const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setSelectedFiles(files);
  };
  
  
  // Upload images to Supabase Storage and return the URLs
  const uploadImages = async () => {
    if (!selectedFiles.length) {
      alert("Please select images before uploading.");
      return [];
    }
  
    let uploadedUrls = [];
    for (let file of selectedFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from("affordimages").upload(fileName, file);
  
      if (error) {
        console.error("Error uploading image:", error.message);
      } else {
        const { data: publicUrlData } = supabase.storage.from("affordimages").getPublicUrl(fileName);
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }
    return uploadedUrls; // Return the array of uploaded URLs
  };
  
  
  
  
  
    useEffect(() => {
      const owner = localStorage.getItem("userId");
      if (owner) {
        setFormData(prev => ({ ...prev, owner }));
      }
    }, []);
  
  
    const handleImageChange = (e) => {
      // const file = e.target.files[0];
      const file=e.target.files[0];
      console.log(file);
      setFormData({...formData,propertyFrontImg:file})
    };
    const handleFileChange2 = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Save the file object properly
      });
    };
    // const handleInputChange = (e) => {
    //   setFormData({...formData,[e.target.name]:e.target.value})
    // };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
      if (name.startsWith("address.")) {
        const field = name.split(".")[1]; // Extract field name (e.g., 'street', 'city')
    
        setFormData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address, // Keep existing address fields
            [field]: value, // Update the specific field
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, // Update non-address fields
        }));
      }
    };
  
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        alert("Change browser");
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationData = {
            type: "Point",
            coordinates: [longitude, latitude], // MongoDB format
          };
          console.log(locationData);
  
          setFormData({ ...formData, location: locationData.coordinates });
        }
      );
    };
  
  
    
    const features = [
      "Parking",
      "Garden",
      "Balcony",
      "Furnished",
      "Pet Friendly",
      "Air Conditioning",
      "Central Heating",
      "Security System",
      "High-Speed Internet",
      "Gym",
      "Swimming Pool",
      "Elevator",
    ];
    const handleFeatureChange = (feature) => {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.includes(feature)
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      }));
    };
  
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form data before submission:', formData);
  
      const requiredFields = [
        'propertySellerIdType',
        'propertyStatus',
        'propertyType'
      ];
  
      const emptyFields = requiredFields.filter(field => !formData[field]);
      if (emptyFields.length > 0) {
        alert(`Please fill in the following required fields: ${emptyFields.join(', ')}`);
        return;
      }
  
      try {
        // First upload the image to Supabase
      
      const uploadedImageUrls = await uploadImages();
  
      if (!uploadedImageUrls.length) {
        alert("Please upload images before submitting the form.");
        return;
      }
  
      setFormData((prevData) => ({
        ...prevData,
        images: uploadedImageUrls, // Update images with uploaded URLs
      }));
  
      // Step 2: Update formData with uploaded image URLs
      const updatedFormData = {
        ...formData,
        images: uploadedImageUrls, // Include the uploaded images
      };
  
    
      const uniqueRegistrationName = `registrationdoc_${Date.now()}_${formData.registrationCopy.name}`;
  const uniqueBlueprintName = `blueprint_${Date.now()}_${formData.bluePrintCopy.name}`;
  
  
  // Upload the files with unique names
  const { data7, error7 } = await supabase.storage
  .from('afford_estate')
  .upload(`property_image_registrationdoc/${uniqueRegistrationName}`, formData.registrationCopy);
  
  console.log(data7, "Uploaded registration doc URL");
  
  const { data8, error8 } = await supabase.storage
  .from('afford_estate')
  .upload(`property_image_blueprint/${uniqueBlueprintName}`, formData.bluePrintCopy);
  
  console.log(data8, "Uploaded blueprint URL");
  
  if (error7 || error8) {
  console.log("Error uploading file(s):", error7 || error8);
  return; // Handle errors appropriately
  }
  
  // Create URLs based on the unique names
  let registrationCopyUrl = `${supabaseUrl}/storage/v1/object/public/afford_estate/property_image_registrationdoc/${uniqueRegistrationName}`;
  console.log('Uploaded image URL:', registrationCopyUrl);
  
  let bluePrintCopyUrl = `${supabaseUrl}/storage/v1/object/public/afford_estate/property_image_blueprint/${uniqueBlueprintName}`;
  console.log('Uploaded image URL:', bluePrintCopyUrl);
  
  // Update formData in a single state update to avoid overwriting
  setFormData({
  ...formData,
  registrationCopy: registrationCopyUrl,
  bluePrintCopy: bluePrintCopyUrl,
  });
  
        
  
           // Step 4: Final data preparation for API submission
      const finalData = {
        ...updatedFormData, // Spread the updated formData with uploaded image URLs
     
        registrationCopy: registrationCopyUrl,
        bluePrintCopy: bluePrintCopyUrl,
      };
  
  
  
          const response = await axios.post("http://localhost:5000/api/property/add-property",{ ...finalData, location: {
            type: "Point",
            coordinates: formData.location, // Ensures MongoDB format
          },});
  
      
        
        console.log('API Response:', response.data);
        if (response.data) {
          alert("Property added successfully");
       navigate('/api/property')
          
        }
      } catch (error) {
        console.error("Error submitting property:", error);
        alert("Failed to add property: " + (error.response?.data?.message || error.message));
      }
    };
  return (
    // <div className={styles["container"]}>
    //   <h1 style={{textAlign:'center'}}>Add Property</h1>
    //   <div className={styles["formCont"]}>
    //     <form action="">
    //       <div className={styles['ownerDetails']}>
    //         <h2>Owner Details</h2>
    //       <label htmlFor="">Name : </label>
    //       <input type="text" name="" id="" required />
    //       <label htmlFor="">Email : </label>
    //       <input type="email" name="" id="" required />
    //       </div>

    //       <div className={styles['buildingDocuments']}>
    //         <h2 className={styles['buildingDocumentsHeading']} style={{color:'#194668'}}> Property Details</h2>

    //         <div className={styles['buildingDocumentsInputs']}>
    //       <label htmlFor="" >Property Name : </label>
    //       <input type="text" name="" id="" required/>
    //       <label htmlFor="" >Property type : </label>
    //       <select name="" id="">
    //         <option value="land">Land</option>
    //         <option value="house">House</option>
    //         <option value="flat">Flat</option>
    //         <option value="shop">Shop</option>
    //       </select>
    //       <label htmlFor="">Location : </label>
    //       <input type="text" name="" id="" minLength={20} required/>
    //       <label htmlFor="">Price : </label>
    //       <input type="number" name="" id="" min={1000} required/>
    //       </div>
  

    //     <div className={styles['buildingDocumentsOuterImage']}>
    //       <h3 style={{color:'#194668'}}>Building Images</h3>  
    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Front image : </label>
    //       <input type="file" name="Outimage" id="" required/>
    //       </div>

    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Right image : </label>
    //       <input type="file" name="Outimage" id="" />
    //       </div>

    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Left image : &nbsp;</label>
    //       <input type="file" name="Outimage" id="" />
    //       </div>
    //       </div>
          

    //       <div className={styles['buildingDocumentsInnerImage']}>
    //       <h3 style={{color:'#194668'}}>Interior Images</h3>
    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">image 1 :&nbsp;</label>
    //       <input type="file" name="Inimage" id="" required/>
    //       </div>
    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">image 2 :</label>
    //       <input type="file" name="Inimage" id="" />
    //       </div>
    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">image 3 :</label>
    //       <input type="file" name="Inimage" id="" />
    //       </div>
    //       </div>
          
    //       <div className={styles['registrationCont']}>
    //       <label >Registration Copy : </label>
    //       <input type="file" name="document" id="" required/>
    //       </div>

    //       <div className={styles['bluePrintCont']}>
    //       <label htmlFor="">Blue Print <span style={{color:'gray',fontSize:'10px'}}>(optional)</span> : </label>
    //       <input type="file" name="document" id=""/>
    //       </div>

    //       <div className={styles['IDCont']} >
    //       <label htmlFor="">ID Type: </label>
    //       <select  onChange={handleGovtId}>
    //         <option value="aadhaar">Aadhaar</option>
    //         <option value="passport">Passport</option>
    //         <option value="pan">Pan</option>
    //         <option value="dl">DL</option>
    //       </select>
    //       </div>

    //       <div className={styles['AadharCont']} >
    //       <label htmlFor="">ID No. : </label>
    //       <input type="text" name="document" id="" minLength={idType==='aadhaar'?12:idType==='passport'?8:idType==='pan'?10:13} maxLength={idType==='aadhaar'?12:idType==='passport'?8:idType==='pan'?10:16} required/>
    //       </div>
          

    //       </div>

    //       {/* <div>
    //         jinga lala hoo hoo.... MAPPING
    //       </div> */}

         

  
    //   <div className={styles['roomSpecsCont']}>

    //       <h2 style={{color:'#194668'}}>Room Specifications</h2>
    //       <div style={{display:'flex',gap:'4.8rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Bedroom : </label>
    //       <input type="number" name="" id="" min={1} required/>
    //       </div>
    //       <div style={{display:'flex',gap:'4.4rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Bathroom : </label>
    //       <input type="number" name="" id="" min={1} required/>
    //       </div>
    //       <div style={{display:'flex',gap:'4.4rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Kitchen : </label>
    //       <input type="number" name="" id="" min={1} required/>
    //       </div>
    //       <div style={{display:'flex',gap:'5.3rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Balcony : </label>
    //       <input type="number" name="" id="" min={0}/>
    //       </div>
    //       <div style={{display:'flex',gap:'3rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Other Space/Parking : </label>
    //       <input type="number" name="" id="" min={0} />
    //       </div>
    //       </div>

    //       <div className={styles['buildingSpecsCont']}>
            
    //       <h2 style={{color:'#194668'}}>Building Specifications  </h2>
    //       <div style={{display:'flex',gap:'11rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Size : </label>
    //       <input type="number" name="" id="" placeholder="sqft" required/>
    //       </div>

    //       <div style={{display:'flex',gap:'8.5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Furnished : </label>
    //       <select name="" id="" style={{width:'180px',marginRight:'10px'}}>
    //         <option value="semi-furnished">semi-furnished</option>
    //         <option value="fully-furnished">fully-furnished</option>
    //         <option value="unfurnished">unfurnished</option>
    //       </select>
    //       </div>

    //       <div style={{display:'flex',gap:'10rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Facing : </label>
    //       <select name="" id="" style={{width:'180px',marginRight:'10px'}}>
    //         <option value="north">North</option>
    //         <option value="south">South</option>
    //         <option value="east">East</option>
    //         <option value="west">West</option>
    //         <option value="northwest">North-West</option>
    //         <option value="southeast">South-East</option>
    //         <option value="northeast">North-East</option>
    //         <option value="southwest">South-West</option>
    //       </select>
    //       </div>
       

    //       <div style={{display:'flex',gap:'4rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">construction year : </label>
    //       <input type="number" name="" id="" placeholder="e.g.,since 2002" required min={1930}/>
    //       </div>

    //       <div style={{display:'flex',gap:'5rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Real Estate Type : </label>
    //       <select name="" id="" style={{width:'180px',marginRight:'10px'}}>
    //         <option value="sell">sell</option>
    //         <option value="rent">Rent</option>
    //         <option value="lease">Lease</option>
    //       </select>
    //       </div>

    //       <div style={{display:'flex',gap:'10rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Resale : </label>
    //       <select name="" id="" style={{width:'180px',marginRight:'10px'}}>
    //         <option value="resale">Resale</option>
    //         <option value="newProperty">New</option>
    //       </select>
    //       </div>

    //       <div style={{display:'flex',gap:'10rem',alignItems:'center',justifyContent:'space-between',width:'500px'}}>
    //       <label htmlFor="">Status : </label>
    //       <select name="" id="" style={{width:'180px',marginRight:'10px'}}>
    //         <option value="available">Available</option>
    //         <option value="sold">Sold</option>
    //         <option value="under-negotiation">Under Negotiation</option>
    //         <option value="coming-soon">Coming Soon</option>
    //       </select>
    //       </div>
    //       </div>
        


        
    //      <div className={styles['aboutProperty']}>

    //       <h4 style={{color:"#194668"}}>Property's Description </h4>
    //       <textarea name="" id="" rows={3} cols={50} minLength={50} required></textarea>
    //       <h4 style={{color:"#194668"}}>More About This Property <span style={{color:'gray'}}>(optional)</span></h4>
    //       <textarea name="" id="" rows={10} cols={50}></textarea>
    //       </div>
       
    //       <input type="submit" name="" id="" value={'Submit Property'} title="submit your property" className={styles['submit']}/>
    //     </form>
    //   </div>
    // </div>
    <div className={styles["container"]}>
    <h1 style={{ textAlign: "center" }}>Add Property</h1>
    <div className={styles["formCont"]}>
      <form onSubmit={handleSubmit}>
  

        <div className={styles["buildingDocuments"]}>
          <h2
            className={styles["buildingDocumentsHeading"]}
            style={{margin:'none'}}
          >
            Property Details
          </h2>

          <div className={styles["buildingDocumentsInputs"]}>
            <label htmlFor="">Property Name : </label>
            <input
              type="text"
              name="propertyName"
              id="propertyName"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="">Property type : </label>
            <select
              name="propertyType"
              id="propertyType"
              onChange={handleInputChange}
            >
              <option value="">Select option</option>
              <option value="land">Land</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>


            <div style={{marginTop:'1rem',borderBottom:'0.5px solid gray',paddingBottom:'1rem'}}>
<h2>Property Address</h2>

<label style={{ fontWeight: "bold" }}>Street:</label>
<input type="text" name="address.street" id="address.street"   onChange={handleInputChange} required 
  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />

<label style={{ fontWeight: "bold" }}>City:</label>
<input type="text" name="address.city" id="address.city"   onChange={handleInputChange} required 
  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />

<label style={{ fontWeight: "bold" }}>State:</label>
<input type="text" name="address.state" id="address.state"   onChange={handleInputChange} required 
  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />

<label style={{ fontWeight: "bold" }}>Zip Code:</label>
<input type="text" name="address.zipCode" id="address.zipCode"  onChange={handleInputChange} required 
  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />

<label style={{ fontWeight: "bold" }}>Country:</label>
<input type="text" name="address.country" id="address.country"   onChange={handleInputChange} required 
  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
</div>

            <label htmlFor="">Location : </label>
            {/* <input type="text" name="location" id="location" minLength={20} required/> */}
            <button
              name="location"
              id="location"
              
              onClick={getUserLocation}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Get Location
            </button>






            <label htmlFor="">Price : </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              min={1000}
              required
            />
          </div>
        </div>

       


          <div className={styles['allImages-cont']}>
            <h2>Select Images of Estate</h2>
          <label htmlFor="">All images : </label>
          <input type="file" multiple onChange={handleFileChange} />
          </div>
       

     

 <div className={styles['id-proof-cont']}>
  <h2>Documentary Evidence</h2>
 <div className={styles["registrationCont"]}>

     
<label>Registration Copy : </label>
<input
  type="file"
  name="registrationCopy"
  id="registrationCopy"
  onChange={handleFileChange2}

/>
</div>

<div className={styles["bluePrintCont"]}>
<label htmlFor="">Blue Print <span style={{ color: "gray", fontSize: "10px" }}>(optional)</span> : </label>
<input
  type="file"
  name="bluePrintCopy"
  id="bluePrintCopy"
  onChange={handleFileChange2}
/>
</div>

<div className={styles["IDCont"]}>
<label htmlFor="">ID Type: </label>
<select
  name="propertySellerIdType"
  id="propertySellerIdType"
  onChange={handleInputChange}
>
  <option value="">Select option</option>
  <option value="aadhaar">Aadhaar</option>
  <option value="passport">Passport</option>
  <option value="pan">Pan</option>
  <option value="DL">DL</option>
</select>
</div>

<div className={styles["AadharCont"]}>
<label htmlFor="">ID No. : </label>
<input
  type="text"
  onChange={handleInputChange}
  name="propertySellerId"
  id="propertySellerId"
  required
/>
</div>
 </div>
     

      <div className={styles["roomSpecsCont"]}>
        <h2 style={{ color: "#194668" }}>Room Specifications</h2>
        <div>
          <label htmlFor="">Bedroom : </label>
          <input
            type="number"
            name="numOfRooms"
            onChange={handleInputChange}
            id="numOfRooms"
            min={1}
            required
          />
        </div>
        <div>
          <label htmlFor="">Bathroom : </label>
          <input
            type="number"
            onChange={handleInputChange}
            name="numOfBathRoom"
            id="numOfBathRoom"
            min={1}
            required
          />
        </div>

        <div>
          <label htmlFor="">Kitchen : </label>
          <input
            type="number"
            onChange={handleInputChange}
            name="numOfKitchen"
            id="numOfKitchen"
            min={1}
            required
          />
        </div>
        <div >
          <label htmlFor="">Balcony : </label>
          <input
            type="number"
            onChange={handleInputChange}
            name="numOfBalcony"
            id="numOfBalcony"
            min={0}
          />
        </div>
        <div>
          <label htmlFor="">Other Space/Parking : </label>
          <input
            type="number"
            onChange={handleInputChange}
            name="numOfOther"
            id="numOfOther"
            min={0}
          />
        </div>
      </div>

      <div className={styles["buildingSpecsCont"]}>
        <h2 style={{ color: "#194668" }}>Building Specifications</h2>
        <div
          style={{
            display: "flex",
            gap: "11rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">Size : </label>
          <input
            type="number"
            onChange={handleInputChange}
            name="propertyArea"
            id="propertyArea"
            placeholder="sqft"
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "8.5rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">Furnished : </label>
          <select
            name="propertyFurnished"
            onChange={handleInputChange}
            id="propertyFurnished"
            style={{ width: "180px", marginRight: "10px" }}
          >
            <option value="">Select option</option>
            <option value="semi-furnished">semi-furnished</option>
            <option value="full-furnished">fully-furnished</option>
            <option value="unfurnished">unfurnished</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">Facing : </label>
          <select
            name="propertyFacing"
            onChange={handleInputChange}
            value={formData.propertyFacing}
            id="propertyFacing"
            style={{ width: "180px", marginRight: "10px" }}
            required
          >
            <option value="">Select Facing</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="northwest">North-West</option>
            <option value="southeast">South-East</option>
            <option value="northeast">North-East</option>
            <option value="southwest">South-West</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "4rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">construction year : </label>
          <input
            type="number"
            onChange={handleInputChange}
            name="propertyConstructionYear"
            id="propertyConstructionYear"
            placeholder="e.g.,since 2002"
            required
            min={1930}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "5rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">Real Estate Type : </label>
          <select
            onChange={handleInputChange}
            name="residentialType"
            id="residentialType"
            value={formData.residentialType}
            style={{ width: "180px", marginRight: "10px" }}
            required
          >
            <option value="">Select Type</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">Resale : </label>
          <select
            onChange={handleInputChange}
            name="propertyResale"
            id="propertyResale"
            style={{ width: "180px", marginRight: "10px" }}
          >
             <option value="">Select option</option>
            <option value="resale">Resale</option>
            <option value="new">New</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10rem",
            alignItems: "center",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <label htmlFor="">Status : </label>
          <select
            onChange={handleInputChange}
            name="propertyStatus"
            id="propertyStatus"
            value={formData.propertyStatus}
            style={{ width: "180px", marginRight: "10px" }}
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending Under Negotiation</option>
          </select>
        </div>
      </div>

      <div className={styles['feature-checkboxes']}>
                <h2 className="">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature) => (
                    <div key={feature} className="flex">
                      <input
                        type="checkbox"
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureChange(feature)}
                        className="h-4 text-primary-600"
                      />
                      <label
                        htmlFor={feature}
                        className="ml-2 text-sm text-gray-600"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

      <div className={styles["aboutProperty"]}>
        <h4 style={{ color: "#194668" }}>Property Description</h4>
        <textarea
          onChange={handleInputChange}
          name="propertyDescription1"
          id="propertyDescription1"
          rows={3}
          cols={50}
          // minLength={50}
          required
        ></textarea>
        <h4 style={{ color: "#194668" }}>
          More About This Property{" "}
          <span style={{ color: "gray" }}>(optional)</span>
        </h4>
        <textarea
          onChange={handleInputChange}
          name="propertyDescription2"
          id="propertyDescription2"
          rows={10}
          cols={50}
        ></textarea>
      </div>

      <input
        type="submit"
        value="Submit Property"
        title="submit your property"
        className={styles["submit"]}
      />
    </form>
  </div>
</div>
  );
}

export default Listing;
