 // ========= Sample question bank with variety ==========
const QUESTIONS = [
  // Single choice (MCQ)
  {id:1,type:'single',category:'Logical',q:'Which number replaces the question mark? 2, 6, 12, 20, ? (sequence of n*(n+1))',choices:['30','30','30','30'],answer:30,explain:'The sequence is n*(n+1): 1*2=2,2*3=6,3*4=12,4*5=20,5*6=30'},
  {id:2,type:'single',category:'Quant',q:'A train covers a distance of 120 km in 1.5 hours. What is its speed in km/h?',choices:['80','70','90','100'],answer:'80',explain:'Speed = distance / time = 120/1.5 = 80 km/h'},
  // Multiple correct
  {id:3,type:'multi',category:'Verbal',q:'Select all words that are antonyms of "abundant".',choices:['Scarce','Plentiful','Meagre','Bountiful'],answer:['Scarce','Meagre'],explain:'Antonyms are scarce and meagre.'},
  // True/False
  {id:4,type:'tf',category:'Logical',q:'Zero is an even number. True or False?',answer:true,explain:'Zero is divisible by 2, therefore even.'},
  // Numeric input
  {id:5,type:'numeric',category:'Quant',q:'If x + 1/x = 5, find x^2 + 1/x^2.',answer:23,explain:'x^2 + 1/x^2 = (x+1/x)^2 - 2 = 25 - 2 = 23'},
  // Short answer (case-insensitive)    {id:6,type:'short',category:'General',q:'Name the company which created the JavaScript language.',answer:'Netscape',explain:'Brendan Eich wrote JavaScript at Netscape.'},
  // Ordering (small)
  {id:7,type:'order',category:'Logical',q:'Arrange numbers in increasing order: 17, 3, 9, 12',choices:['3','9','12','17'],answer:['3','9','12','17'],explain:'Simple numeric ordering.'},
  // Combination puzzle
  {id:8,type:'single',category:'Logical',q:'If 3 apples + 2 bananas = 16 and 1 apple + 3 bananas = 11, what is the value of an apple?',choices:['2','5','3','4'],answer:'3',explain:'Solve linear equations: a=3.'},
  // Another numeric
  {id:9,type:'numeric',category:'Quant',q:'What is the LCM of 12 and 18?',answer:36,explain:'Prime factors: 12=2^2*3, 18=2*3^2 -> LCM=2^2*3^2=36'},
  // A bit tougher reasoning
  {id:10,type:'single',category:'Logical',q:'Find the odd one out: 135, 342, 216, 512, 728',choices:['135','342','216','512','728'],answer:'512',explain:'512 is a power of 2 (2^9); others aren\'t similar pattern.'},

  // 11–20
  {id:11, type:'single', category:'Logical', q:'Which number comes next: 2, 4, 8, 16, ?', choices:['20','24','32','36'], answer:'32', explain:'Series doubles each time'},
  {id:12, type:'numeric', category:'Quant', q:'Find 15% of 200', answer:30, explain:'15/100*200 = 30'},
  {id:13, type:'multi', category:'Verbal', q:'Select all antonyms of "happy"', choices:['sad','joyful','miserable','glad'], answer:['sad','miserable'], explain:'Antonyms are sad and miserable'},
  {id:14, type:'tf', category:'General', q:'Water boils at 100°C at sea level. True or False?', answer:true, explain:'At sea level, water boils at 100°C'},
  {id:15, type:'short', category:'General', q:'Who invented the telephone?', answer:'Alexander Graham Bell', explain:'Bell invented the telephone in 1876'},
  {id:16, type:'order', category:'Logical', q:'Arrange in ascending order: 12, 7, 19, 3', choices:['12','7','19','3'], answer:['3','7','12','19'], explain:'Arrange smallest to largest'},
  {id:17, type:'single', category:'Quant', q:'What is 9*7?', choices:['56','63','72','66'], answer:'63', explain:'9*7=63'},
  {id:18, type:'multi', category:'Logical', q:'Select all prime numbers', choices:['2','3','4','5','6'], answer:['2','3','5'], explain:'Primes are 2,3,5'},
  {id:19, type:'tf', category:'Verbal', q:'The word "benevolent" means kind. True or False?', answer:true, explain:'Benevolent = kind-hearted'},
  {id:20, type:'numeric', category:'Quant', q:'LCM of 8 and 12?', answer:24, explain:'LCM = 24'},

  // 21–30
  {id:21, type:'single', category:'Logical', q:'Find the odd one out: 2, 4, 6, 9, 10', choices:['2','4','6','9','10'], answer:'9', explain:'All even except 9'},
  {id:22, type:'short', category:'General', q:'Capital of Japan?', answer:'Tokyo', explain:'Tokyo is the capital'},
  {id:23, type:'single', category:'Quant', q:'What is 45 ÷ 5?', choices:['8','9','7','6'], answer:'9', explain:'45/5=9'},
  {id:24, type:'multi', category:'Verbal', q:'Select synonyms of "quick"', choices:['fast','slow','rapid','sluggish'], answer:['fast','rapid'], explain:'Synonyms: fast, rapid'},
  {id:25, type:'tf', category:'Logical', q:'0 is a positive number. True or False?', answer:false, explain:'0 is neither positive nor negative'},
  {id:26, type:'order', category:'Quant', q:'Arrange: 21, 14, 7, 28', choices:['21','14','7','28'], answer:['7','14','21','28'], explain:'Ascending order'},
  {id:27, type:'single', category:'Logical', q:'Next in series: 5, 10, 20, 40, ?', choices:['50','60','80','100'], answer:'80', explain:'Each number doubles'},
  {id:28, type:'numeric', category:'Quant', q:'Square of 12?', answer:144, explain:'12*12=144'},
  {id:29, type:'multi', category:'Verbal', q:'Select all nouns', choices:['run','table','apple','happy'], answer:['table','apple'], explain:'Nouns: table, apple'},
  {id:30, type:'tf', category:'General', q:'The sun rises in the west. True or False?', answer:false, explain:'Sun rises in the east'},

  // 31–40
  {id:31, type:'single', category:'Logical', q:'Find odd one: 11, 13, 17, 20, 19', choices:['11','13','17','20','19'], answer:'20', explain:'All are prime except 20'},
  {id:32, type:'numeric', category:'Quant', q:'Cube of 3?', answer:27, explain:'3*3*3=27'},
  {id:33, type:'single', category:'Verbal', q:'Synonym of "begin"', choices:['start','end','stop','finish'], answer:'start', explain:'Begin = start'},
  {id:34, type:'multi', category:'Logical', q:'Select even numbers', choices:['1','2','3','4','5'], answer:['2','4'], explain:'Even numbers: 2,4'},
  {id:35, type:'tf', category:'General', q:'Earth revolves around the Sun. True or False?', answer:true, explain:'Earth revolves around Sun'},
  {id:36, type:'short', category:'General', q:'Largest ocean?', answer:'Pacific', explain:'Pacific is largest'},
  {id:37, type:'single', category:'Quant', q:'50% of 200?', choices:['50','100','150','200'], answer:'100', explain:'50% of 200=100'},
  {id:38, type:'order', category:'Logical', q:'Arrange: 9, 3, 6, 12', choices:['9','3','6','12'], answer:['3','6','9','12'], explain:'Ascending order'},
  {id:39, type:'multi', category:'Verbal', q:'Select adjectives', choices:['happy','run','fast','apple'], answer:['happy','fast'], explain:'Adjectives: happy, fast'},
  {id:40, type:'tf', category:'General', q:'Water freezes at 0°C. True or False?', answer:true, explain:'Freezes at 0°C'},

  // 41–50
  {id:41, type:'single', category:'Logical', q:'Next in series: 1, 1, 2, 3, 5, ?', choices:['6','7','8','9'], answer:'8', explain:'Fibonacci series'},
  {id:42, type:'numeric', category:'Quant', q:'20% of 250?', answer:50, explain:'20/100*250=50'},
  {id:43, type:'multi', category:'Verbal', q:'Select all verbs', choices:['run','apple','sleep','happy'], answer:['run','sleep'], explain:'Verbs: run, sleep'},
  {id:44, type:'tf', category:'Logical', q:'2 is a prime number. True or False?', answer:true, explain:'2 is prime'},
  {id:45, type:'short', category:'General', q:'Chemical symbol for water?', answer:'H2O', explain:'H2O'},
  {id:46, type:'order', category:'Quant', q:'Arrange: 50, 20, 70, 10', choices:['50','20','70','10'], answer:['10','20','50','70'], explain:'Ascending order'},
  {id:47, type:'single', category:'Logical', q:'Odd one out: 3, 6, 9, 11, 12', choices:['3','6','9','11','12'], answer:'11', explain:'All divisible by 3 except 11'},
  {id:48, type:'numeric', category:'Quant', q:'Square root of 225?', answer:15, explain:'15*15=225'},
  {id:49, type:'multi', category:'Verbal', q:'Select synonyms of "happy"', choices:['joyful','sad','cheerful','angry'], answer:['joyful','cheerful'], explain:'Synonyms: joyful, cheerful'},
  {id:50, type:'tf', category:'General', q:'The sky is blue. True or False?', answer:true, explain:'Sky appears blue due to scattering'},
  // 51–100: Additional 50 questions (distinct from first 50)

  {id:51,type:'single',category:'Logical',q:'If Monday is coded as 12345, how is Friday coded?',choices:['54678','65487','54321','57684'],answer:'54321',explain:'Pattern based on position of letters'},
  {id:52,type:'numeric',category:'Quant',q:'Find the square root of 169',answer:13,explain:'√169 = 13'},
  {id:53,type:'multi',category:'Verbal',q:'Select all synonyms of "angry"',choices:['furious','happy','irate','joyful'],answer:['furious','irate'],explain:'Synonyms are furious and irate'},
  {id:54,type:'tf',category:'General',q:'The Great Wall of China is visible from the Moon. True or False?',answer:false,explain:'It is a myth; not visible from Moon'},
  {id:55,type:'short',category:'General',q:'Name the author of "Harry Potter"',answer:'J.K. Rowling',explain:'Author of Harry Potter series is J.K. Rowling'},
  {id:56,type:'order',category:'Logical',q:'Arrange: 5, 2, 9, 1',choices:['5','2','9','1'],answer:['1','2','5','9'],explain:'Ascending order'},
  {id:57,type:'single',category:'Quant',q:'What is 25% of 200?',choices:['25','50','75','100'],answer:'50',explain:'25% of 200 = 50'},
  {id:58,type:'multi',category:'Verbal',q:'Select all antonyms of "cold"',choices:['hot','warm','cool','chilly'],answer:['hot','warm'],explain:'Antonyms are hot and warm'},
  {id:59,type:'tf',category:'Logical',q:'All squares are rectangles. True or False?',answer:true,explain:'Every square is a rectangle'},
  {id:60,type:'numeric',category:'Quant',q:'LCM of 6 and 8?',answer:24,explain:'LCM = 24'},

  {id:61,type:'single',category:'Logical',q:'Find next in series: 3, 6, 12, 24, ?',choices:['30','36','48','50'],answer:'48',explain:'Each number doubles'},
  {id:62,type:'numeric',category:'Quant',q:'Cube of 5?',answer:125,explain:'5*5*5 = 125'},
  {id:63,type:'multi',category:'Verbal',q:'Select all verbs',choices:['run','jump','red','happy'],answer:['run','jump'],explain:'Verbs are run and jump'},
  {id:64,type:'tf',category:'General',q:'Lightning never strikes the same place twice. True or False?',answer:false,explain:'Lightning can strike multiple times'},
  {id:65,type:'short',category:'General',q:'Capital of Canada?',answer:'Ottawa',explain:'Capital city of Canada is Ottawa'},
  {id:66,type:'order',category:'Logical',q:'Arrange: 14, 7, 21, 3',choices:['14','7','21','3'],answer:['3','7','14','21'],explain:'Ascending order'},
  {id:67,type:'single',category:'Quant',q:'What is 15*12?',choices:['180','150','200','175'],answer:'180',explain:'15*12=180'},
  {id:68,type:'multi',category:'Logical',q:'Select all prime numbers',choices:['7','9','11','15'],answer:['7','11'],explain:'Primes are 7 and 11'},
  {id:69,type:'tf',category:'Verbal',q:'The word "optimistic" means hopeful. True or False?',answer:true,explain:'Optimistic means hopeful'},
  {id:70,type:'numeric',category:'Quant',q:'Find 10% of 450',answer:45,explain:'10% of 450 = 45'},

  {id:71,type:'single',category:'Logical',q:'Odd one out: 21, 33, 45, 50',choices:['21','33','45','50'],answer:'50',explain:'50 is not multiple of 3'},
  {id:72,type:'numeric',category:'Quant',q:'Square of 18?',answer:324,explain:'18*18 = 324'},
  {id:73,type:'multi',category:'Verbal',q:'Select all adjectives',choices:['fast','run','slow','apple'],answer:['fast','slow'],explain:'Adjectives: fast, slow'},
  {id:74,type:'tf',category:'General',q:'Venus is the hottest planet. True or False?',answer:true,explain:'Due to greenhouse effect, Venus is hottest'},
  {id:75,type:'short',category:'General',q:'Who painted Mona Lisa?',answer:'Leonardo da Vinci',explain:'Mona Lisa by Leonardo da Vinci'},
  {id:76,type:'order',category:'Logical',q:'Arrange: 4, 12, 7, 9',choices:['4','12','7','9'],answer:['4','7','9','12'],explain:'Ascending order'},
  {id:77,type:'single',category:'Quant',q:'What is 7*8?',choices:['54','56','58','60'],answer:'56',explain:'7*8=56'},
  {id:78,type:'multi',category:'Logical',q:'Select numbers divisible by 5',choices:['10','12','15','18'],answer:['10','15'],explain:'Divisible by 5: 10,15'},
  {id:79,type:'tf',category:'Verbal',q:'Synonyms of "angry" include "mad". True or False?',answer:true,explain:'Mad is synonym of angry'},
  {id:80,type:'numeric',category:'Quant',q:'LCM of 9 and 12?',answer:36,explain:'LCM=36'},

  {id:81,type:'single',category:'Logical',q:'Next in series: 5, 10, 15, 20, ?',choices:['24','25','30','22'],answer:'25',explain:'Add 5 each time'},
  {id:82,type:'numeric',category:'Quant',q:'Cube root of 64?',answer:4,explain:'4*4*4 = 64'},
  {id:83,type:'multi',category:'Verbal',q:'Select antonyms of "bright"',choices:['dull','shiny','dim','light'],answer:['dull','dim'],explain:'Antonyms: dull, dim'},
  {id:84,type:'tf',category:'General',q:'Sound travels faster in air than in water. True or False?',answer:false,explain:'Sound travels faster in water than air'},
  {id:85,type:'short',category:'General',q:'Largest planet in Solar System?',answer:'Jupiter',explain:'Jupiter is largest'},
  {id:86,type:'order',category:'Logical',q:'Arrange: 20, 5, 15, 10',choices:['20','5','15','10'],answer:['5','10','15','20'],explain:'Ascending order'},
  {id:87,type:'single',category:'Quant',q:'50*4?',choices:['200','100','150','250'],answer:'200',explain:'50*4=200'},
  {id:88,type:'multi',category:'Logical',q:'Select even numbers',choices:['11','12','13','14'],answer:['12','14'],explain:'Even numbers: 12,14'},
  {id:89,type:'tf',category:'Verbal',q:'The word "benevolent" means kind. True or False?',answer:true,explain:'Benevolent = kind'},
  {id:90,type:'numeric',category:'Quant',q:'Find 5% of 500',answer:25,explain:'5% of 500 = 25'},

  {id:91,type:'single',category:'Logical',q:'Odd one out: 100, 121, 144, 150',choices:['100','121','144','150'],answer:'150',explain:'All perfect squares except 150'},
  {id:92,type:'numeric',category:'Quant',q:'Square of 14?',answer:196,explain:'14*14 = 196'},
  {id:93,type:'multi',category:'Verbal',q:'Select synonyms of "quick"',choices:['fast','slow','rapid','lazy'],answer:['fast','rapid'],explain:'Synonyms: fast, rapid'},
  {id:94,type:'tf',category:'General',q:'The Earth is flat. True or False?',answer:false,explain:'Earth is round'},
  {id:95,type:'short',category:'General',q:'Who discovered penicillin?',answer:'Alexander Fleming',explain:'Fleming discovered penicillin'},
  {id:96,type:'order',category:'Logical',q:'Arrange: 8, 2, 6, 4',choices:['8','2','6','4'],answer:['2','4','6','8'],explain:'Ascending order'},
  {id:97,type:'single',category:'Quant',q:'9*9?',choices:['81','72','79','90'],answer:'81',explain:'9*9=81'},
  {id:98,type:'multi',category:'Logical',q:'Select multiples of 3',choices:['4','6','7','9'],answer:['6','9'],explain:'Multiples of 3: 6,9'},
  {id:99,type:'tf',category:'Verbal',q:'Synonyms of "happy" include "joyful". True or False?',answer:true,explain:'Joyful = happy'},
  {id:100,type:'numeric',category:'Quant',q:'LCM of 15 and 20?',answer:60,explain:'LCM=60'},
    ]