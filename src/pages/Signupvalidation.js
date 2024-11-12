const validation=(values)=>
{

    let errors={};
    const usernamepattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordpattern=/^.{8,}$/


    if(values.fullName==="")
    {
        errors.fullName="Fullname should not be empty"
    }
    else{
        errors.fullName="";
    }
    if(values.username==="")
    {
        errors.username="Username should not be empty";
    }
    else if(!usernamepattern.test(values.username))
    {
        errors.username="Username didnot match";
    }
    else
    {
        errors.username="";
    }


    if(values.password==="")
        {
            errors.password="Password should not be empty";
        }
        else if(!passwordpattern.test(values.password))
        {
            errors.password="Password must have 8 characters";
        }
        else
        {
            errors.passowrd="";
        }


        if(values.confirmpassword==="")
        {
            errors.confirmpassword="Confirm passowrd should not be empty"
        }


        else if(values.password!==values.confirmpassword)
            {
                errors.confirmpassword="Password didnot match";
            }
            else
            {
                errors.confirmpassowrd="";
            }

           


            return errors;



}


export default validation;