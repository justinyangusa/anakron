# a command is everything

command ->
	  verb {%
	  	function(d) {
	  		return {
	  			"verb": d[0]
	  		};
	  	}
	%}
	| verb _ prepositionalphrases {%
		function(d) {
			return {
				"verb": d[0],
				"prepositionalphrases": d[2]
			};
		}
	%}
	| verb _ noun {%
		function(d) {
			return {
				"verb": d[0],
				"object": d[2],
			};
		}
	%}
	| verb _ noun _ prepositionalphrases {%
		function(d) {
			return {
				"verb": d[0],
				"object": d[2],
				"prepositionalphrases": d[4]
			};
		}
	%}

verb -> word {% id %}
nounword -> word {% id %}
preposition ->
	"with" {% id %}

article -> "the" | "an" | "a"

noun -> nounword {% id %} | article _ nounword {% function(d) {return d[2]} %}

prepositionalphrase -> preposition _ noun {%
		function(d) {
			return {
				"preposition": d[0],
				"object": d[2]
			}
		}
	%}

prepositionalphrases -> prepositionalphrase
	| prepositionalphrases _ prepositionalphrase {%
		function(d) {return d[0].concat([d[2]])}
	%}

word -> [a-z0-9_] {% id %}
	| word [a-z0-9_] {% function(d) {return d[0] + d[1]; } %}

_ -> [\s] | [\s] _