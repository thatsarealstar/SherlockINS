/* 
SCRIPT INFO.
Name: SherlockINS Bot Script
Description: A bot created by Sherlock to spice up boring lobbies or just for fun!
Creator: thatsarealstar (Sherlock)
Time: 6:44 PM (10/16/2025)
*/

console.log("Please wait, preloading GitHub files...");

async function loadAdmins() {
  const url = 'https://raw.githubusercontent.com/thatsarealstar/SherlockINS/refs/heads/main/admins.json';
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to load admins.json');
  return await response.json();
}

// Cache admins in memory for speed
let cachedAdmins = null;
async function getAdmins() {
  if (cachedAdmins) return cachedAdmins;
  cachedAdmins = await loadAdmins();
  console.log("[✔] Admin list loaded:", cachedAdmins);
  return cachedAdmins;
}

async function isAdmin(userId) {
  const admins = await getAdmins();
  return admins.includes(userId);
}

getAdmins();

// --- Bot setup ---
console.log("Checking name and color configuration...");
if (MPP.client.user.name !== "👌 SherlockINS" || MPP.client.user.color !== "#ff0000") {
  console.log("Name and color wrong! Setting...");
  MPP.client.sendArray([{
    m: "userset",
    set: {
      name: "👌 SherlockINS",
      color: "#ff0000"
    }
  }]);
}

// --- Command handler ---
MPP.client.on("a", async (msg) => {
  const message = msg.a.trim();
  const parts = message.split(" ");
  const command = parts[0].toLowerCase(); // first word (like ";help")
  const arg = parts[1]; // second word (like "admtools")

  if (command === ";help") {
    MPP.client.sendArray([{
      m: "a",
      message: "Heyo! The commands will be dm'd to you. (Use ;dmrules for information on why this is happening.)",
      reply_to: msg.id
    }]);

    const adminStatus = await isAdmin(msg.p._id);

    if (adminStatus) {
      console.log(`[✔] ${msg.p.name} is an administrator! Allowing hidden categories...`);
      MPP.client.sendArray([{
        m: "dm",
        message: "[✔] Categories: [🛠] Administrator Tools (admtools)",
        _id: msg.p._id,
        reply_to: msg.id
      }]);
    } else {
      console.log(`[❌] ${msg.p.name} isn't an administrator! Not allowing hidden categories...`);
      MPP.client.sendArray([{
        m: "dm",
        message: "✔ Categories: [❌] No categories. See ya soon!",
        _id: msg.p._id,
        reply_to: msg.id
      }]);
    }

    // admtools category
    if (arg === "admtools") {
      if (adminStatus) {
        console.log(`✔ ${msg.p.name} is an administrator! Showing admin tools...`);
        MPP.client.sendArray([{
          m: "dm",
          message: "[🛠] Administrator Tools | (1) ;ban `user id` (Bans a user from the channel.) | Use ;cmdinfo `command name` to get a command's information on usage."
        }]);
      } else {
        console.log(`❌ ${msg.p.name} isn't an administrator! Blocking admtools access.`);
        MPP.client.sendArray([{
          m: "dm",
          message: "[❌] Category unavailable! Permission levels prohibit access to this category!"
        }]);
      }
    }
  }
});
  console.log("Name and color wrong! Setting...");
  MPP.client.sendArray([{
    m: "userset",
    set: {
      name: "👌 SherlockINS",
      color: "#ff0000"
    }
  }]);
}

// --- Command handler ---
MPP.client.on("a", async (msg) => {
  const message = msg.a.trim();
  const command = message.split(" ")[0].toLowerCase();

  if (command === ";help") {
    MPP.client.sendArray([{
      m: "a",
      message: "Heyo! The commands will be dm'd to you. (Use ;dmrules for information on why this is happening.)",
      reply_to: msg.id
    }]);

    const adminStatus = await isAdmin(msg.p._id);

    if (adminStatus) {
      console.log(`[✔] ${msg.p.name} is an administrator! Allowing hidden categories...`);
      MPP.client.sendArray([{
        m: "dm",
        message: "[✔] Categories: [🛠] Administrator Tools (admtools)",
        _id: msg.p._id,
        reply_to: msg.id
      }]);
    } else {
      console.log(`[❌] ${msg.p.name} isn't an administrator! Not allowing hidden categories...`);
      MPP.client.sendArray([{
        m: "dm",
        message: "✔ Categories: [❌] No categories. See ya soon!",
        _id: msg.p._id,
        reply_to: msg.id
      }]);
    }
    if (command[1] === "admtools") {
      if (adminStatus) {
        console.log(`✔ ${msg.p.name} is an administrator! Allowing hidden categories...`);
        MPP.client.sendArray([{"m": "dm", message: "[🛠] Administrator Tools | (1) ;ban ``user id`` (Bans a user from the channel.) | Use ;cmdinfo ``command name`` to get a command's information on usage."}])
      } else {
        console.log(`❌ ${msg.p.name} isn't an administrator! Not allowing hidden categories...`);
        MPP.client.sendArray([{"m": "dm", message: "[❌] Category unavaliable! Permission levels prohibit access to this category!"}])
      }
    }
  }
});
