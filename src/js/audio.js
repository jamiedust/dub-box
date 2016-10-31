require('audio-context-monkey-patch');

var audio = {

    /**
     * Initialises the audio context, assigning both context and destination as
     * properties on the audio object.
     */
    init: function() {

        if(typeof AudioContext === 'function') {
            this.context = new AudioContext();
        } else {
            alert('Unfortunately your browser does not yet support the Web Audio API');
            return;
        }

        this.dest = this.context.destination;
        this.setUpNodes();

    },

    /**
     * Sets up the audio nodes and applies initial values to audio params
     */
    setUpNodes: function() {

        this.osc = this.context.createOscillator();
        this.osc.type = 'sine';
        this.osc.frequency = 300;

        this.gain = this .context.createGain();
        this.gain.gain.value = 0.5;

        this.osc.connect(this.gain);
        this.gain.connect(this.dest);

        this.osc.start();

        document.querySelector('.dial').addEventListener('change', function() {
            console.log(this.value);
            audio.gain.gain.value = this.value;
        });

    },

    /**
     * Binds an audio param to a UI element
     *
     * @param {string} node The audio node
     * @param {string} param The param to bind
     * @param {object/DOM node} el The element to bind its value to
     */
    bindEvent: function(node, param, elem) {

        if(typeof this[node] === 'undefined') {
            console.log('Cannot bind node: ' + node);
            return;
        }

        if(typeof this[node][param] === 'undefined') {
            console.log('There is no ' + param + ' parameter on the ' + node + ' node');
            return;
        }

        if(typeof elem !== 'object') {
            console.log(elem + ' is not a DOM element');
            return;
        }

        // should event listeners be part of ui module instead?

        elem.addEventListener('change', function() {
            this[node][param].value
        });

    }



};

module.exports = audio;