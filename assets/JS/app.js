// variables

const form = document.querySelector('#form');
const submitBtn = document.querySelector('.button');
const tweet = document.querySelector('#tweet');
const tweetList = document.querySelector('#tweet-list')

// event Listeners 

eventListeners();
function eventListeners() {
    // form submission
    form.addEventListener('submit', newTweet);
    
    // remove tweet from DOM
    tweetList.addEventListener('click', removeTweet);

    // on loadng document. we want the event listener:...
    document.addEventListener('DOMContentLoaded', localStorageOnLoad)

}

// functions

function newTweet(e) {
    e.preventDefault();

    // read value of textarea
    // console.log(tweet.value);

    // this code works but it's wayy too long and ineffective

    // // create new element (ul) and append elemet to <div id = "tweet-list"></div>
    // const ul = document.createElement('ul');
    // // create li
    // const li = document.createElement('li');
    // li.className = 'tweet-message';
    // // create text node
    // const tweetText = document.createTextNode(tweet.value)
    // // append tweet into li
    // li.appendChild(tweetText);
    // // change list style of li
    // li.style.listStyleType = 'disc';
    // // append li to ul
    // ul.appendChild(li);
    // // append ul to tweet-list
    // tweetList.appendChild(ul);

    // a shorter code will be this syntax..
    const li = document.createElement('li');
    li.textContent = tweet.value;

    // create remove button
    const removeBtn = document.createElement('a');
    removeBtn.textContent = "X";
    removeBtn.classList.add('remove-tweet');
    
    // append button to li
    li.appendChild(removeBtn);
    
    tweetList.appendChild(li);
    // console.log(tweetList);
    
    // adding to local storage function call
    const tweetText = tweet.value;
    addTweetToLocalStorage(tweetText);

    // remove value from textarea
    // tweet.value = "";
    // or..
    this.reset();

    // print the alert
    alert('You added a new tweet');
}

// removes tweet from the DOM

function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    // remove tweet from the storage
    removeTweetFromLocalStorage(e.target.parentElement.textContent);

    // alert to remove tweet
    alert('Do you want to remove this tweet?')
}

// adding to local storage function

function addTweetToLocalStorage(tweetText) {
    let tweets = getTweetFromStorage();
    
    // push tweet values into the tweets array we've created
    tweets.push(tweetText);
    
    // console.log(tweets);

    // convert array to string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');

    // get tweet from storage if null is returned, then we create empty array..
    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

// print local storage tweets on load 

function localStorageOnLoad() {
    let tweets = getTweetFromStorage();

    // loop through the storage and print the values
    tweets.forEach(tweet => {
        // console.log(tweet);

        const li = document.createElement('li');
        li.textContent = tweet;

        // create remove button
        const removeBtn = document.createElement('a');
        removeBtn.textContent = "X";
        removeBtn.classList.add('remove-tweet');
        
        // append button to li
        li.appendChild(removeBtn);
        
        tweetList.appendChild(li);
    });
}

// removes tweet from the local storage

function removeTweetFromLocalStorage(tweet) {
    // get tweets from storage
    let tweets = getTweetFromStorage();

    // remove the X from the tweet
    const tweetDelete = tweet.substring(0, tweet.length -1);

    // loop through the tweets and remove the tweet thats equal
    tweets.forEach((tweetLs, index) => {
        if (tweetDelete === tweetLs) {
            tweets.splice(index, 1)
        }
    })

    // save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}