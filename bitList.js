// 
//  bitmask.js
//  bitmask class
//  
//  Created by Arlo Carreon on 2011-03-16.
//  Copyright 2011 arlocarreon.com All rights reserved.
// 
bitList = function(){
	
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
	// Method returns the value of entire list.
	listValue = function(){
		// Keep track of sum
		var sum = 0;
		// Iterate through the list and return it's sum
		for(var key in list)
		{
			// Make sure that the key is not from a prototype chain
			if(list.hasOwnProperty(key))
			{ sum += list[key]; }
		}
		// Return Sum
		return sum;
	}
	// Inserts a new element into the list
	get = function(element){
		// Make sure we already have this element
		if( !list[element] )
		{
			// Insert element and it's value: 2^(length)
			list[element] = Math.pow(2,length());
		}
		
		// return it's value
		return list[element];
	}
	
	// Translate 2 params into groupIDs.
	// Accepts arrays of labels or numbers
	translate = function( a, b ){
		// Local vars
		var aID = 0, bID = 0;
		
		// Check to see if A is number or array
		if( a && a.length )
		{ 
			// Iterate through array
			for(var i=0; i<a.length; i++)
			{ 
				// Get Element
				var el = a[i].toString();
				// Make sure a[i] is in fact in the list,
				// if not then nothing happens
				aID += ( list[el] ) ? get(el):0; 
			
			} 
		}
		else if( typeof a === "number" )
		{ aID = a; }
		
		// Check to see if B is number or array
		if( b && b.length )
		{ 
			// Iterate through array
			for(var i=0; i<b.length; i++)
			{ 
				// Get Element
				var el = b[i].toString();
				// Make sure b[i] is in fact in the list
				// if not then nothing happens
				bID += ( list[el] ) ? get(el):0;
			}
		}
		else if( typeof b === "number" )
		{ bID = b; }
		// This means b was never passed, so substitute with entire list
		else
		{ bID = listValue() }
		
		return { a:aID, b:bID };
	}
	
	// ==================================
	// = Public Interface for the class =
	// ==================================
	return {
		// matchAny : Returns [number] the number of matches between groups, groupIDs or mixture of the two.
		matchAny : function( a, b ){
			// Translate the params
			var p = translate(a,b);
			// Return number of matches comparison
			// Convert bit operator result to binary, strip the zeros and count the 1s
			return ( p.a & p.b ).toString(2).replace(/0/g,'').length;
		},
		// matchAll :  Returns [boolean] whether or not groups, groupIDs or 
		// mixture of the two match exactly the same
		matchAll : function( a, b ){
			// Translate our parameters
			var p = translate(a,b);
			// Return our boolean
			return (p.a===p.b);
		},
		// matchNone : Returns [boolean] whether or not there are exactly ZERO matches between 
		// groups, groupIDs or mixture of the two.
		matchNone : function(a,b){
			// Translate our parameters
			var p = translate(a,b);
			// return our boolean
			return ( (p.a & p.b)===0 );
		},
		// getGroupID: Takes a collection (array) of tags/labels 
		// and returns that groups value/ID
		getTagsID : function(groupAry){
			// Make sure we were passed an array
			if( !groupAry.length )
				return 0;
			// Our groupID is the BIT SUM of all the elements
			var sum = 0;
			// Iterate through this group to calculate it's identifier
			for(var i=0; i<groupAry.length; i++)
			{
				var el = groupAry[i];
				sum += get(el.toString());
			}
			// Return our groupID
			return sum;
		},
		// getListID: returns the groupID/value of the entire list
		getListID : function(){
			// Relay the private function
			return listValue();
		},
		// ----------------------------------------------------------
		// Temporary functions: Used for debugging only
		getList : function(){ return list; },
		trans : function(a,b){ translate(a,b); },
	};
};