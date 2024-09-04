/*const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
	console.log(xhr.response);
});

xhr.open('GET', 'https://superSimplebackend.dev/greeting');
xhr.send();*/

/*const promise = fetch(
    'https://supersimplebackend.dev/greeting'
).then((response) => {
    return response.text();
}).then(data => {
    console.log(data);
});*/

/*async function greetingfun() {
    const response = await fetch(
        'https://supersimplebackend.dev/greeting'
    );
    const text = await response.text();
    console.log(text);
}

greetingfun();*/

/*async function greetingfun() {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": "Abebayehu"
        })
      });

      const text = await response.text();
      console.log(text);
}

greetingfun();*/

/*async function fun() {
   try {
    const response = await fetch('https://amazon.com');
    const text = await response.text();
    console.log(text);

  } catch (error) {
    console.log('CORS error. You request was blocked by the backend.');
  }
}

fun();*/

async function greetingfun() {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
            
          });
    
          if (response.status >= 400) {
            throw response;
          }

          const text = await response.text();
          console.log(text);
    } catch (error) {
        if (error.status === 400) {
            console.log(await error.json());
        } else {
            console.log('Network error. Please try again later.');
        }
    }
    
}

greetingfun();