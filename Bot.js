const discord = require("discord.js");
const is = new require("image-search-google");

var client = new discord.Client();
var spag = "🍝";
var noodlz = ["spaghetti","rotini","manicotti","campanelle","fusilli","ravioli","lasagne","riccioli","tagliatelle","rotelle","rigatoni","tortellini","fettuccine","ziti","orzo","linguine","farfalle","penne","orecchiette","pappardelle",spag];
var token = "";
var cseID = "";
var api_k = "";
var search = new is(cseID, api_k);

client.on("ready", function() {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity(`"${spag}help" for help`);
});

client.on("message", msg => {
  if ((msg.content.startsWith(spag)||msg.content.startsWith("\\"+spag))==false)
    return;

  let c = msg.content.replace(spag, "").split(" ");
	if (c[0]=="")
		c = c[1];
	else {
		c = c[0];
	}
	console.log((msg.channel.type=="text" ? msg.guild.name+"#"+msg.channel.name : "DM")+"@"+msg.author.username+": "+msg.content);
	if (noodlz.includes(c)) {
		if (c===spag) {
			c=noodlz[Math.ceil(Math.random()*noodlz.length-1)-1];
		}
    search.search(c, {page: Math.ceil(Math.random()*3)}).then(res=>{
			msg.channel.send(res[Math.ceil(Math.random()*res.length)-1].url);
		}).catch(e=>{
			msg.channel.send("No more "+spag+" today :c");
			console.log(e);
		});
	} else if (c=="help") {
		msg.channel.send(`\`\`\`
Usage: ${spag}<type>
Types:

${noodlz.join("\n")} (random)

There are only 100 Spaghettis available per day so pls no spam k thx\`\`\``);
	}
});

client.login(token);