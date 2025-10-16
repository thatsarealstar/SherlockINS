/* 
SCRIPT INFO. 
Name: SherlockINS Bot Script
Description: A bot created by Sherlock to spice up boring lobbies or just for fun!
Creator: thatsarealstar (Sherlock)
Time: 6:44 PM (10/16/2025)
*/

function preloadGHStuff() {
  console.log("Please wait, preloading GitHub files...")
  function saveParticipants() {
  const participants = [];

  for (const participant of MPP.client.ppl.values()) {
    participants.push({
      name: participant.name,
      id: participant._id
    });
  }

  console.log("Participants recorded! Here they are:", JSON.stringify(participants, null, 2))
  return participants;

    saveParticipants()
}

preloadGHStuff()

  console.log("Checking name and color configuration...");
  if (MPP.client.name !== "👌 SherlockINS" && MPP.client.color !== "#ff0000") {
    console.log("Name and color wrong! Setting...");
    MPP.client.sendArray([{
      m: "userset",
      set: {
        name: "👌 SherlockINS",
        color: "#ff0000"
      }
    }]);
  }
});

MPP.client.on("a", (msg) => {
  const message = msg.a;
  const command = message.split(" ");

  if (command[0] === ";help") {
    MPP.client.sendArray([{
      m: "a",
      message: "Heyo! The commands will be dm'd to you. (Use ;dmrules for information on why this is happening.)",
      reply_to: msg.id
    }]);

    MPP.client.sendArray([{
      m: "dm",
      message: "Thank you for using SherlockINS! Unfortunately, this version has absolutely no commands. Check again later!",
      _id: msg.p._id,
      reply_to: msg.id
    }]);
  }
});

