/* 
SCRIPT INFO.
Name: SherlockINS Bot Script
Description: A bot created by Sherlock to spice up boring lobbies or just for fun!
Creator: thatsarealstar (Sherlock)
Time: 6:44 PM (10/16/2025)
*/

console.log("Please wait, preloading GitHub files...");

// --- Admin loader ---
async function loadAdmins() {
  const url = 'https://raw.githubusercontent.com/thatsarealstar/SherlockINS/refs/heads/main/admins.json';
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to load admins.json');
  return await response.json();
}

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
MPP.client.sendArray([{m: "a", message: "SherlockINS is online!"}])
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
  const parts = message.split(/\s+/); // Split by any amount of spaces
  const command = parts[0].toLowerCase(); // ";help"
  const arg = parts[1] ? parts[1].toLowerCase() : null; // "admtools" if given

  // Main ;help command
  if (command === ";help") {
    const adminStatus = await isAdmin(msg.p._id);

    // No argument (plain ;help)
    if (!arg) {
      MPP.client.sendArray([{
        m: "a",
        message: "Heyo! The commands will be DM'd to you. (Use ;dmrules for info.)",
        reply_to: msg.id
      }]);

      if (adminStatus) {
        console.log(`[✔] ${msg.p.name} is an admin! Showing categories...`);
        MPP.client.sendArray([{
          m: "dm",
          message: "[✔] Categories: [🛠] Administrator Tools (use ;help admtools)",
          _id: msg.p._id,
          reply_to: msg.id
        }]);
      } else {
        console.log(`[❌] ${msg.p.name} isn't an admin.`);
        MPP.client.sendArray([{
          m: "dm",
          message: "✔ Categories: [❌] No categories. See ya soon!",
          _id: msg.p._id,
          reply_to: msg.id
        }]);
      }
    }

    // Subcategory: ;help admtools
    else if (arg === "admtools") {
      if (adminStatus) {
        console.log(`[🛠] ${msg.p.name} opened Administrator Tools.`);
        MPP.client.sendArray([{
          m: "dm",
          message: "[🛠] Administrator Tools | (1) ;ban `user id` (Bans a user) | (2) ;cmdinfo `command name` (Get command info).",
          _id: msg.p._id,
          reply_to: msg.id
        }]);
      } else {
        console.log(`[❌] ${msg.p.name} tried to access admtools but isn't an admin.`);
        MPP.client.sendArray([{
          m: "dm",
          message: "[❌] Category unavailable! You do not have permission to view Administrator Tools.",
          _id: msg.p._id,
          reply_to: msg.id
        }]);
      }
    }
  }
});
