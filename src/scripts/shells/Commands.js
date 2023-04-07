
// Import Terminal Commands
import Alias from "/src/scripts/shells/commands/Alias.js";
import Clear from "/src/scripts/shells/commands/Clear.js";
import Echo from "/src/scripts/shells/commands/Echo.js";
import Help from "/src/scripts/shells/commands/Help.js";
import Js from "/src/scripts/shells/commands/Js.js";
import Theme from "/src/scripts/shells/commands/Theme.js";
import Unalias from "/src/scripts/shells/commands/Unalias.js";

/*
 * Terminal Commands.
 *
 * @include alias +
 * @include cd
 * @include cp
 * @include clear +
 * @include contact
 * @include cookie
 * @include date
 * @include echo +
 * @include eruda
 * @include exit
 * @include export
 * @include help +
 * @include hostname
 * @include js +
 * @include ls
 * @include mkdir
 * @include mv
 * @include request
 * @include rmdir
 * @include test
 * @include theme
 * @include tree
 * @include unalias +
 * @include unexport
 */
export default [ Alias, Clear, Echo, Help, Js, Theme, Unalias ];
