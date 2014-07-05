module.exports = {
    "actions": {
        "scream": function() {
            return "Aaarrrghhhh!";
        },
        "jump": function() {
            return "Wheeeeeeeee!";
        },
        "cry": function() {
            return "No, Hacker, nuh cry! :)";
        },
        "laugh": function() {
            return "Hahahahaha.";
        },
        "dance": function() {
            return "That's the way! You've got the groove.";
        },
        "sing": function() {
            return "Please don't. My ears hurt enough from all your shouting.";
        },
        "clap": function() {
            return "*applause*";
        },
        "sigh": function() {
            return "*siiiiiiiiiigh*";
        },
        "burp": function() {
            return "Learn to burp in your elbow next time.";
        },
        "sneeze": function() {
            return "Ghezundiet!";
        },
        "cough": function() {
            return "I did tell you to put on that other sweater; it's your own fault.";
        },
        "look": function() {
            return "You're in the old chem lab (room P-305). You're surrounded by scary science stuff. A flask is on top of a rather puny table. There is a small cabinet besides the table, next to a window whose blinds are turned down. A large grandfather's clock lives in the corner next to the bookshelf.";
        },
        "fart": function() {
            return "You cause a minor explosion, and the fire department gets a warning.";
        },
        "ls": function() {
            return "You are not at a UNIX terminal. You are in a fantasy universe. This incident will be reported.";
        },
        "sl": function() {
            return "I am incapable of rendering an engine.";
        }
    },
    "objects": {
        "table": {
            "flipped": false,
            "actions": {
                "hit": function() {
                    return "Ow! You're such a bully, you know?";
                },
                "flip": function() {
                    this.flipped = true;
                    return "_|__|_ Are you happy now? All those caustic burns in the floor aren't my fault, you know.";
                },
                "inspect": function() {
                    return this.flipped ? "Whatever it is, it's upside-down." : "It's a really flimsy table, you feel you could flip it over with one hand.";
                },
                "kill": function() {
                    return "The table transitions to the fourth phase of a furniture's life: furniture nirvana, in the form of the undead ZOMBLES.";
                }
            }
        },
        "clock": {
            "actions": {
                "inspect": function() {
                    return "A tall clock. It shows the right time, believe it or not. It ticks next to the bookshelf.";
                }
            }
        },
        "flask": {
            "actions": {
                "drink": function() {
                    return "This isn't Alice in Wonderland! Don't drink crazy liquids! You puke all over the bookshelf.";
                },
                "smell": function() {
                    return "Have you ever smelled applesauce on a crisp autumn day? This smells exactly unlike that.";
                },
                "throw": function() {
                    return "Argh, it shattered on the wall. There's a big stain that vaguely resembles Barney the Purple Dinosaur.";
                },
                "drop": function() {
                    return "Butterfingers. I'm not cleaning that up, ok?";
                },
                "inspect": function() {
                    return "There's a blue liquid in thin Borosil. We've seen that enough.";
                }
            }
        },
        "key": {
            "taken": false,
            "actions": {
                "take": function(pps, world) {
                    this.taken = true;
                    return "Ooh, shiny!";
                },
                "inspect": function() {
                    return "It's a beautiful key, brass, with a nice feeling in your hand when you hold it. How did nobody notice it in all these years? You ought to take it.";
                }
            }
        },
        "bookshelf": {
            "actions": {
                "inspect": function() {
                    return "It's an old, musty bookshelf, complete with selections such as Robinson Crusoe, Treasure Island, Mutiny Aboard the HMS Bounty, and Divergent.";
                }
            }
        },
        "divergent": {
            "actions": {
                "read": function() {
                    return "As you open the book, a small key falls out of the pages. You may want to take it. The rest of the book is as dreary as it used to be.";
                }
            }
        },
        "blinds": {
            "actions": {
                "open": function() {
                    return "The pane behind the blinds bears a striking resemblance to everything that isn't a window. In fact, it isn't a window. It's a safe.";
                },
                "inspect": function() {
                    return "It's hard to come across a truly good set of window blinds. This is definitely not one of them. You can feel the wood crinkle in your hands.";
                }
            }
        },

        "safe": {
            "actions": {
                "open": function(pps, world) {
                    if (world.objects.key.taken) {
                        return "The safe contains a small paper.";
                    } else {
                        return "As you can imagine, the safe is locked, which could be a problem.";
                    }
                },
                "pick": function() {
                    return "Picking a safe isn't easy. You do not have those skills yet. Sorry.";
                }
            }
        },

        "paper": {
            "actions": {
                "inspect": function() {
                    return "The paper is rough and crinkled, but the handwriting is neat in contrast. It says 'It lives in the cabinet'.";
                }
            }
        },

        "cabinet": {
            "actions": {
                "open": function(pps, world) {
                    return "There is a grue. The grue possesses a bag. The grue seems to avoid wanting to give you the bag, because the grue was having a bad day and didn't really expect your satisfaction to contribute to his happiness in any way. There is also a large gravy dish that could probably fit a grue in it.";
                },
                "inspect": function() {
                    return "A small wooden cabinet. Nothing extraordinary, as far as you can tell.";
                }
            }
        },

        "dish": {
            "actions": {
                "inspect": function() {
                    return "A typical gravy dish, which the possible distinction of being extravagantly large.";
                }
            }
        },

        "grue": {
            "dead": false,
            "actions": {
                "attack": function(pps, world) {
                    this.dead = true;
                    return "A valiant blow, reducing our enemy to a corpse resting on the bookshelf.";
                },
                "punch": function(pps, world) {
                    this.dead = true;
                    return "A valiant blow, reducing our enemy to a corpse resting on the bookshelf.";
                },
                "hit": function(pps, world) {
                    this.dead = true;
                    return "A valiant blow, reducing our enemy to a corpse resting on the bookshelf.";
                },
                "kill": function(pps, world) {
                    this.dead = true;
                    return "A valiant blow, reducing our enemy to a corpse resting on the bookshelf.";
                },
                "stab": function(pps, world) {
                    if (pps["with"] === "sword") {
                        return "You unseam the grue from the nave to the chops, reducing him to a pile of bones resting against the bookshelf. There is a box behind him."
                    } else {
                        return "You know, you need something to stab the guy with. Just sayin'.";
                    }
                },
                "bury": function() {
                    if (this.dead) {
                        return "Thank you for your sentiments.";
                    } else {
                        return "You're burying a grue alive? Really? You've got guts. Unfortunately, they won't remain in you for long at this rate.";
                    }
                }
            }
        },

        "bag": {
            "actions": {
                "open": function(pps, world) {
                    if (world.objects.grue.dead) {
                        return "The bag contains a shovel, a book, and a pair of trousers.";
                    } else {
                        return "It's kind of open to inspect a bag that a grue possesses.";
                    }
                },
                "inspect": function() {
                    return "Imagine Santa's bag, except smaller, less red, and borne by a less jolly individual.";
                }
            }
        },

        "trousers": {
            "actions": {
                "wear": function() {
                    return "The word `trousers` must be the funniest in the English language. Go find some jeans.";
                }
            }
        },

        "shovel": {
            "actions": {
                "inspect": function() {
                    return "It's almost but not quite rusty. Just dirty. It might have belonged to the grue. Wouldn't it be ironic if we had to bury it with him?";
                }
            }
        },

        "book": {
            "actions": {
                "inspect": function() {
                    return "It's a beautiful anthology of Greek mythology. The opening leave has a note written in a scrawled handwriting: 'Follow the wax wings.'";
                },
                "read": function() {
                    return "Who has time for reading?!";
                }
            }
        },

        "ceiling": {
            "actions": {
                "hit": function() {
                    return "Your fists pound on the false ceiling. In a cloud of plaster and dust, you see a container plop down to the ground.";
                }
            }
        },

        "container": {
            "actions": {
                "open": function() {
                    return "The container, true to its nature, contains a large scroll of paper titled 'Living Will and Testament'. It looks important... oh, yes, that's what you were looking for, wasn't it? Does that mean you've won? Are you sure?";
                }
            }
        }

    }
};