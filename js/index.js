const form = document.querySelector('form');
const fullName = document.getElementById("fname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail(){
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message:${mess.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "euphoriasportz2020@gmail.com",
        Password : "111BE60E47DE49A13F4CD777807D01562E83",
        To : 'euphoriasportz2020@gmail.com',
        From : "euphoriasportz2020@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK"){
          Swal.fire({
            title: "Sucess!",
            text: "Message Sent!",
            icon: "success"
          });
        }
      }
    );
    
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  sendEmail();
  form.reset();
  return false;
})  