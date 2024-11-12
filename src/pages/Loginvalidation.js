const validation=(values)=>
{

    let error={};
    const usernamepattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordpattern=/^.{8,}$/

    if(values.username==="")
    {
        error.username="Username should not be empty";
    }
    else if(!usernamepattern.test(values.username))
    {
        error.username="Username not valid"
    }
    

    if(values.password==="")
    {
        error.password="Should not be empty";
    }
    else if(!passwordpattern.test(values.password))
    {
        error.password="Enter a Password to 8 characters"
    }
   

    return error;


   





}

export default validation;