
import ScrollReveal from "scrollreveal";

export default {
	mounted: function( el, binding )
	{
		const options = binding.value || {};
		ScrollReveal().reveal( el.childNodes, { reset: true }, options.sequenceDelay );
	}
};