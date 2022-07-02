/* eslint-disable no-console */
// Require the necessary discord.js classes
import DiscordJS, { Client, Intents } from 'discord.js';

import dotenv from 'dotenv';
dotenv.config();

// Create a new client instance
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
  let commands = client.application?.commands;

  commands?.create({
    name: 'test',
    description: 'test'
  })

  commands?.create({
    name: 'start',
    description: 'Starts the Pomodoro Technique with the given parameters',
    options: [{
        name: 'worktime',
        description: 'The amount for each Pomodoro',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        required: true
      },
      {
        name: 'stoptime',
        description: 'Amount of time you want to rest between Pomodoros',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        required: true
      },
      {
        name: 'repetitions',
        description: 'Number of repetitions you want to do of one Pomodoro and and Stop',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        required: true
      }
    ]
  })
});

client.on('messageCreate', (message) => {
  if(!message.author.bot) {
    console.log(`${message} received`);
    message.reply({
      content: 'Your message was received'
    });
  }
})

client.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand()) {
    return
  } else {
    const { commandName, options } = interaction;
    switch(commandName) {
      case 'start':
        interaction.reply({
          content: 'You have started the program successfully'
        });
        break;
      case 'test':
        interaction.reply({
          content: 'test'
        });
        break;
    }
  }
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
