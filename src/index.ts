import Pandora from './Pandora'

import * as configFile from './config.json';


const pandoraBot: Pandora = new Pandora(configFile);
pandoraBot.startup();



