
const checkForKey = () => {       //a function that runs every time the extension is opened to check for a key stored in our extension storage
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        resolve(result['openai-key']);
      });
    });
  };

const encode = (input) => {       // encoding whatever is passed in 
    return btoa(input);
  };

const saveKey = () => {
    const input = document.getElementById('key_input');

  if (input) {
    const { value } = input;

    // Encode String
    const encodedValue = encode(value);

    // Save to google storage
    chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    });
  }

}

//enables the key_needed ui to be shown to enter a new API key if needed
const changeKey = () => {
    document.getElementById('key_needed').style.display = 'block';
    document.getElementById('key_entered').style.display = 'none';
};


document.getElementById('save_key_button').addEventListener('click', saveKey);
document
  .getElementById('change_key_button')
  .addEventListener('click', changeKey);

checkForKey().then((response) => {     //runs every time the extension is opened
    if (response) {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    }
});

//When updating the extention follow these steps

// Change extension code in VS Code
// Reload extension in your browser
// Reload any tab you want to use the extension on
// Click the extension and add in the API key
// Test!

