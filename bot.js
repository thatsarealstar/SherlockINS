/* 
SCRIPT INFO. 
Name: SherlockINS Bot Script
Description: A bot created by Sherlock to spice up boring lobbies or just for fun!
Creator: thatsarealstar (Sherlock)
Time: 6:44 PM (10/16/2025)
*/

function preloadGHStuff() {
  console.log("Please wait, preloading GitHub files...");
  async function loadAdmins() {
  const url = 'https://raw.githubusercontent.com/thatsarealstar/SherlockINS/refs/heads/main/admins.json';
  const response = await fetch(url, { cache: 'no-store' });
  // if (!response.ok) throw new Error('Failed to load admins.json');
  return await response.json();
}

async function isAdmin(userId) {
  const admins = await loadAdmins();
  return admins.includes(userId);
}
}
preloadGHStuff();

// Set bot name and color if not already
console.log("Checking name and color configuration...");
if (MPP.client.name !== "👌 SherlockINS" || MPP.client.color !== "#ff0000") {
  console.log("Name and color wrong! Setting...");
  MPP.client.sendArray([{
    m: "userset",
    set: {
      name: "👌 SherlockINS",
      color: "#ff0000"
    }
  }]);
}

// Handle commands
MPP.client.on("a", (msg) => {
  const message = msg.a;
  const command = message.split(" ");

  if (command[0] === ";help") {
    MPP.client.sendArray([{
      m: "a",
      message: "Heyo! The commands will be dm'd to you. (Use ;dmrules for information on why this is happening.)",
      reply_to: msg.id
    }]);
    isAdmin(msg.p._id).then(isAdmin => {
  if (isAdmin) {
    console.log("✔ " + msg.p.name + " is an administrator! Allowing hidden categories...");
    MPP.client.sendArray([{
      m: "dm",
      message: "✔ Categories: [🛠] Administrator Tools (admtools)",
      _id: msg.p._id,
      reply_to: msg.id
    }]);
  } else {
    console.log("❌ " + msg.p.name + " isn't an administrator! Not allowing hidden categories...");
    MPP.client.sendArray([{
      m: "dm",
      message: "✔ Categories: [❌] No categories. See ya soon!",
      _id: msg.p._id,
      reply_to: msg.id
    }]);
  }
  }
});
