/*
Interview Follow-up Questions

1. A typical problem in our work at CardinalHire involves the processing of user input, which is often noisy, and often a string or array.
With the language of your choice, given two integer arrays (A and B), how would you sort and merge B into A as one sorted array?
Note: You may assume that A has enough space to hold additional elements from B, and the number of elements initialized in A and B are M and N, respectively.

	Main idea: 
		Push elements of B into A. Sort A in place.     
	Runtime: 
		O(M) to push elements B and O((M + N)*log(M + N)) to sort (usually).  

2. If, instead, the two arrays A and B are string arrays, with the language of your choice, how would you sort and merge B into A as one sorted array? Does your approach change?
Note: Same assumptions as above.

	No, the approach does not change. The comparison function just needs to account for string literals.  

3. We want to give our recruiters the ability to create lists of candidates for one-click scheduling of interviews.
How would you design a database table for recruiters, candidates, and their date and time availability?

  (r.availability) 		       (c.availability) 
  	 |         	                       |
     ----------                            ----------
    |recruiters|      ---- ? -----        |candidates|     INTERVIEWS (ER model) 
     ----------		                   ----------
     	 |		                       |
       (rid) 		       		     (cid)
		
         /   	       \    /             \
	/ can interview \  / is waiting on \   possible relationship sets 
	\               /  \               /
	 \             /    \             / 

	An example of using this table could be:

		SELECT * FROM INTERVIEWS 
		WHERE rid = 1234 AND 
		c.availability BETWEEN r.availability AND r.availability; 



4. If the data types are mostly strings, would another data type work better, and how? 
If you can, compare one data type to another and briefly discuss the pros and cons of each.

	If an entity had multiple attributes which consisted of primarily strings, then we can 
	achieve the same table if we stored the strings as a string array instead. We just have 
	to replace all attribute names in Postgres statements with their corresponding array 
	indices. By doings so, we save computation for any operation which divide strings and 
	other data types (i.e. count the number of quanitative/qualitative attributes). 

	Both Char(n) and Varchar(n) can only store up to n characters in length. If the string is 
	less than n characters, Char(n) will pad empty spaces, while Varchar(n) will not. If what
	you are storing is fixed in length, Char will give better performance while Varchar is more 
	useful for storing variable length data. 

5. If CardinalHire knew the exact availability at all times of all candidates and recruiters, 
and when facing a high traffic and limited availability for a given recruiter, 
how would you distribute interviews among candidates?	

    The longer a candidate must wait, we risk the possibility of the candidate being hired by 
    another recruiter. Keep a timestamp on candidate or the number of recruiters the candidate 
    is waiting on (a popular candidate) to calculate priority. If the traffic to availibility 
    ratio is still high, consider a filter on candidate's attributes i.e. years-of-experience.
    An example of this logic in Postgres would be: 

    	SELECT * FROM INTERVIEWS 
	WHERE rid = 1234 AND 
	c.availability BETWEEN r.availability AND r.availability AND
	years-of-experience >= 3 
	ORDER BY c.timestamp, c.num-of-recruiters ASC; 
*/

function merge_sort(A, B) { //for questions 1 & 2
	/*
	input: 
		A - comparable arr size M 
		B - comparable arr size N 
	output: 
		destructively change A into sorted arr size M + N
	*/
	for(i = 0; i<B.length; i++) {
		A.push(B[i]);
	}
	return A.sort(compare);
}

function compare(a,b) { //helper 
	if (typeof(a) === 'string') { //string comparison 
		return a.localeCompare(b);
	}
	return a - b; //numerical comparison 
}


//TESTING

var a = [2, 3.3, 4, 5];

var b = [1, 9, 20, 14];

var copya = a.splice();
var copyb = b.splice();

merge_sort(a,b);
console.log(a.length === 8);
console.log(copya !== a); //desctructive
console.log(copyb.value === b.value); //non-desctructive 
console.log(a);

a = ["apple", "Orange", "Tomato"];
b = ["kiwi", "banana", "Abe"]

var copya = a.splice();
var copyb = b.splice();

merge_sort(a,b);
console.log(a.length === 6);
console.log(copya !== a);
console.log(copyb.value === b.value); //non-desctructive 
console.log(a);
