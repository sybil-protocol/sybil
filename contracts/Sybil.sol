pragma solidity ^0.4.18;

contract Sybil {
    event AttributeUpdated(address addr, string key, string value);

    mapping (address => mapping (string => string)) registry;

    function set (string key, string value) public {
        registry[msg.sender][key] = value;
        AttributeUpdated(msg.sender, key, value);
    }
    
    function get (address subject, string key) public view returns (string) {
        return registry[subject][key];
    }
}