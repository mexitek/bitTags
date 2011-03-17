// 
//  bitmask.js
//  bitmask class
//  
//  Created by Arlo Carreon on 2011-03-16.
//  Copyright 2011 arlocarreon.com All rights reserved.
// 
bitlist = function(){
	
	// =================================
	// = Private Variables and Methods =
	// =================================
	// Our actual bitmasked list
	var list = {};
	
	// Method that gives us the current length of the list
	length = function(){
		var count=0;
		// Iterate through the list and only count local attributes,
		// not variables in the prototype chain
		for(var key in list)
		{
			if( list.hasOwnProperty(key) )
			{ count++; }
		}
		// return the count
		return count;
	}
	
	// Inserts a new element into the list
	get = function(element){
		// Make sure we already have this element
		if( !list[element] )
		{
			// Insert element and it's value: 2^(length+1)
			list[element] = Math.pow(2,length()+1);
		}
		
		// return it's value
		return list[element];
	}
	
	// ==================================
	// = Public Interface for the class =
	// ==================================
	return {
		getGroupID : function(groupAry){
			// Make sure we were passed an array
			if( !groupAry.length )
				return 0;
			// Our groupID is the BIT SUM of all the elements
			var sum = 0;
			// Iterate through this group to calculate it's identifier
			for(var i=0; i<groupAry.length; i++)
			{
				var el = groupAry[i];
				sum += (typeof el==="string") get(el):get(el.toString());
			}
			// Return our groupID
			return sum;
		}
		getListID : function(){
			// Keep track of sum
			var sum = 0;
			// Iterate through the list and return it's sum
			for(var key in list)
			{
				// Make sure that the key is not from a prototype chain
				if(list.hasOwnProperty(key))
				{
					sum += list[key];
				}
			}
			// Return Sum
			return sum;
		}
	};
};