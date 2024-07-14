const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");
document.addEventListener("DOMContentLoaded", function () {
  const innerDiv = document.querySelector(".charge");
  const duration = 2000; // Animation duration in milliseconds (2 seconds)

  // Simulate fetching data from an API
  percentage =100; 
  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
         percentage =80;
         ; // Replace with actual API response
        resolve(percentage);
      }, 1000); // Simulate network delay
    });
  };

  // Function to animate height up to the target percentage
  const animateHeight = (targetPercentage) => {
    let startTime;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate the current height based on elapsed time
      const heightPercentage = Math.min((elapsed / duration) * targetPercentage, targetPercentage);

      // Apply the height to the inner div
      innerDiv.style.height = `${heightPercentage}%`;

      // Update the background color based on the height percentage
// Assume heightPercentage is a value from 1 to 200

// Calculate the hue value for HSL
let hue;
   // Set the background color based on heightPercentage
   if (heightPercentage <= 20) {
    hue = (heightPercentage / 20) * 60; // 0 to 20: Yellow
    innerDiv.style.background = `hsl(${hue}, 100%, 50%)`;
  } else if (heightPercentage <= 40) {
    hue = ((heightPercentage - 20) / 20) * 60 + 55; // 20 to 40: Light Green
    innerDiv.style.background = `hsl(${hue}, 100%, 50%)`;
  } else if (heightPercentage <= 60) {
    hue = ((heightPercentage - 40) / 20) * 60 + 60; // 40 to 60: Green
    innerDiv.style.background = `hsl(${hue}, 100%, 50%)`;
  } else if (heightPercentage <= 80) {
    hue = ((heightPercentage - 60) / 20) * 60 *-20; // 60 to 80: Orange
    innerDiv.style.background = `hsl(${hue}, 100%, 50%)`;
  } else {
    hue = ((heightPercentage - 80) / 20) * 60 + 240; // 80 to 100: Red
    innerDiv.style.background = `hsl(${hue}, 100%, 50%)`;
  }

// Set the background color using HSL
innerDiv.style.transition = "background 0.5s ease";
innerDiv.style.background = `hsl(${hue}, 100%, 50%)`;


      if (heightPercentage < targetPercentage) {
        // Continue the animation if the target percentage is not yet reached
        requestAnimationFrame(animate);
      }
      
    }

    // Start the animation
    requestAnimationFrame(animate);
  };

  // Fetch the data and start the animation
  fetchData().then((percentage) => {
    animateHeight(percentage);
  });
  

});
const setupUI = (user) => {
  if (user) {

    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display = 'block';
    userDetailsElement.style.display = 'block';
    userDetailsElement.innerHTML = user.email;


    var uid = user.uid;
    console.log(uid);
    let level = 0;

    var dbPathTemp = 'UsersData/' + uid.toString() + '/temperature';
    var dbPathHum = 'UsersData/' + uid.toString() + '/humidity';
    var dbPathPres = 'UsersData/' + uid.toString() + '/pressure';
    // var percentage = 50;

    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefPres = firebase.database().ref().child(dbPathPres);


    dbRefTemp.on('value', snap => {
      var tempValue = snap.val().toFixed(2);
      console.log(tempValue,typeof(tempValue));
      percentage =  parseInt(tempValue, 10);
      console.log(percentage,typeof(percentage));
      tempElement.innerText=percentage;
      const fetchData = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
             percentage = 100; // Replace with actual API response
              console.log(percentage,typeof(percentage));
            resolve(percentage);
          }, 1000); // Simulate network delay
        });
      };
    
      // Function to animate height up to the target percentage
      const animateHeight = (targetPercentage) => {
        let startTime;
        let duration = 5;
        function animate(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
    
          // Calculate the current height based on elapsed time
          const heightPercentage = Math.min((elapsed / duration) * targetPercentage, targetPercentage);
    
          // Apply the height to the inner div
          innerDiv.style.height = `${heightPercentage}%`;
    
          // Update the background color based on the height percentage
          // if (heightPercentage <= 25) {
          //   innerDiv.style.background = "var(--red)";
          // } else if (heightPercentage <= 50) {
          //   innerDiv.style.background = "var(--orange)";
          // } else if (heightPercentage <= 75) {
          //   innerDiv.style.background = "var(--yellow)";
          // } else {
          //   innerDiv.style.background = "var(--green)";
          // }
          const popup = document.createElement('div');
          popup.id = 'popup';
          popup.textContent = `Height Percentage: ${heightPercentage}`;
          innerDiv.appendChild(popup);
          popup.style.display = 'block';
          
          // Optionally hide the popup after a certain time
          setTimeout(() => {
            popup.style.display = 'none';
          }, 3000); // Hide after 3 seconds
          
          if (heightPercentage < targetPercentage) {
            // Continue the animation if the target percentage is not yet reached
            requestAnimationFrame(animate);
          }
        }
    
        // Start the animation
        requestAnimationFrame(animate);
      };
    
      // Fetch the data and start the animation
      fetchData().then((percentage) => {
        animateHeight(percentage);
      });
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
      // animateHeight = (targetPercentage);
    });

    dbRefPres.on('value', snap => {
      presElement.innerText = snap.val().toFixed(2);
    });

    function startCharging() {

      const interval = setInterval(function () {
        level += 10;
        document.getElementById('batteryLevel').style.height = `${level}%`;
        if (level >= 100) {
          clearInterval(interval);
          alert('Battery fully charged!');
        }
      }, 1000);

      chargeElement.style.height = heightPercentage + '%';
      chargeElement.style.background = backgroundColor;
      boltElement.style.animation = animationName ? `${animationName} 1s infinite` : '';
    }


  } else {

  
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display = 'block';
    userDetailsElement.style.display = 'block';
    userDetailsElement.innerHTML = user.email;
  }
}
