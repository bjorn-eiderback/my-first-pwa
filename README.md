# my-first-pwa

A simple PWA showing some text and a cherry.

Firebase Demo: https://myawesomepwa-c87a1.firebaseapp.com

Github Demo:
* https://antigones.github.io/my-first-pwa/
* https://bjorn-eiderback.github.io/my-first-pwa/

To publish the sw to Github hosting, please change the following function in main.js:

```
if('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/my-first-pwa/sw.js')
		.then(function() { console.log("Service Worker Registered"); });
}
```
Cherry icon by Vignesh P http://www.oviyanicons.com/

Text by Cupcake Ipsum​ http://www.cupcakeipsum.com/

## Deploy
### GitHub
How to deploy to GitHub?<br/>
Use settings and GitHub Pages.<br/>
See
* https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
* https://pages.github.com/

### Firebase
How to deploy to Firebase.<br/>
See https://blog.usejournal.com/how-to-quickly-deploy-your-progressive-web-apps-using-firebase-14a0c09e9a11

1. if needed
    <pre>
        npm install -g firebase-tools
    </pre>
    
1. Then interact with Firebase (see https://www.youtube.com/watch?v=e-aAAbY0miY)
    <pre>
        firebase login
        <i>add a new project or use existing one</i>
        firebase init hosting //or firebase init and then choose hosting
        <i>choose a dist directory like dev or the default public</i>
        <i>answer "n" for if we want to create a single page app</i>
        <i>move js, images, css catalogs to dev (or public) also move index.html (overwrite the one FB created), manifest.json, content.json and sw.js to the deploy catalogue</i>
        firebase deploy
    </pre>