var RLLimit
var RLReset
var limited = false

module.exports = {
  updateRL: (lim, rem, res, bot) => {
    if (rem <= 3) {
      bot.Channels.find((c) => c.name === 'bot-log').sendMessage('', false, {
        color: 0x3498db,
        timestamp: new Date(),
        title: 'Ratelimit reached',
        description: 'The bot has reached its UserVoice rate limit and will no longer accept commands.',
        fields: [{name: 'Ratelimit:', value: RLLimit, inline: true},{name: 'Reset at:', value: RLReset.toString(), inline: true}],
        footer: {
          text: 'MegaBot v' + require('../package.json').version,
          icon_url: 'https://cdn.discordapp.com/attachments/258274103935369219/278959167601901568/bots2.png' // ORIGINAL CONTENT PLEASE DONT STEAL
        }
      })
      limited = true
    }
    RLLimit = lim
    RLReset = new Date(res)
  },

  checkRL: () => {
    if (limited && Date.now() > RLReset) {
      limited = false;
      return true;
    }
    else if (!limited) {
      return true;
    }
    else return false;
  }
}