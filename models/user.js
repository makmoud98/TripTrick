var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    location:{type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    departing: String,
    returning: String,
    activities:[{type: mongoose.Schema.Types.ObjectId,
        ref: "Activity"
    }],
    memos:[{type: mongoose.Schema.Types.ObjectId,
         ref: "Memo"
        }],
    items:[{type: mongoose.Schema.Types.ObjectId,
         ref: "Item"
        }]
    });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);