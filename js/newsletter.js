const msg = document.getElementById('msg');
window.addEventListener("DOMContentLoaded", function() {
  const yourForm = document.getElementById('FORM_ID');
  yourForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(yourForm);
      const action = e.target.action;
      fetch(action, {
          method: 'POST',
          body: data,
      }).then(response => {
        msg.innerHTML = "Thank you for Subscribing!"
        setTimeout(function(){
          msg.innerHTML = ""
        },5000)
        yourForm.reset()
      })
      .catch(error => console.error('Error', error))
  })
}); 