
/*
 * Terminal Commands.
 *
 * @include alias
 * @include cd
 * @include cp
 * @include chintya
 * @include contact
 * @include cookie
 * @include date
 * @include echo
 * @include exit
 * @include export
 * @include help
 * @include hostname
 * @include liana
 * @include ls
 * @include mkdir
 * @include mv
 * @include request
 * @include rmdir
 * @include test
 * @include theme
 * @include tree
 * @include unalias
 * @include unexport
 */
export default {
	test: {
		data: {},
		props: {
			test: {
				type: String,
				require: true
			},
			case: {
				type: String,
				require: false,
				default: "Tzy"
			}
		},
		methods: {},
		mounted: async function({ test })
		{
			console.log( test );
		}
	}
};

// $args Function Arguments
// $argv Function Argument Values
// $root Component
// $root.loading
// $root.loadingProgress
// $root.loadingProgressMax
// $root.loadingProgressNow
// $root.loadingProgressText
// $root.loadingProgressType
