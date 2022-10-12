/**
 * Language: Cypher
 * Contributors:
 *   Johannes Wienke <languitar@semipol.de>
 *   Gustavo Reis <gusbemacbe@gmail.com>
 */
 const FLOGRAM_IDENT_RE = '[\u00C0-\u02B8a-zA-Z_$][\u00C0-\u02B8a-zA-Z_$0-9]*';
 const GENERIC_IDENT_RE = JAVA_IDENT_RE
    + recurRegex('(?:<' + JAVA_IDENT_RE + '~~~(?:\\s*,\\s*' + JAVA_IDENT_RE + '~~~)*>)?', /~~~/g, 2);
 module.exports = function (hljs)
 {
   return {
     case_insensitive: true,
     keywords:
       {
         keyword: 'addr_of any as bind bits bool break constant contract else enum equals export fn get if iface is import interface length list loop member mut native none object set sizable type types release return value_of',
         literal: 'true false null zero',
         buit_in: 'self this'
         type: 'i8 i16 i32 i64 u8 u16 u32 u64 f8 f16 f32 d64 bool'
       },
     contains:
       [
         hljs.QUOTE_STRING_MODE,
         hljs.APOS_STRING_MODE,
         hljs.C_NUMBER_MODE,
         {
           className: 'string',
           begin: '`',
           end: '`',
           illegal: '\\n',
           contains: [hljs.BACKSLASH_ESCAPE]
         },
         {
           className: 'type',
           begin: /((-|>)?\s?\(|-\[)\w*:/,
           excludeBegin: true,
           end: '\\W',
           excludeEnd: true,
         },
         {
           className: 'functionCall',
           begin: /(\s+|,)\w+\(/,
           end: /\)/,
           keywords: {
             built_in: 'all any exists none single coalesce endNode head id last length properties size startNode timestamp toBoolean toFloat toInteger type avg collect count max min percentileCont percentileDisc stDev stDevP sum extract filter keys labels nodes range reduce relationships reverse tail abs ceil floor rand round sign e exp log log10 sqrt acos asin atan atan2 cos cot degrees haversin pi radians sin tan left ltrim replace reverse right rtrim split substring toLower toString toUpper trim distance'
           }
         },
         hljs.C_BLOCK_COMMENT_MODE,
         hljs.C_LINE_COMMENT_MODE,
         {
           begin: '//',
           ends: '//',
         }
       ]
   }
 }
 