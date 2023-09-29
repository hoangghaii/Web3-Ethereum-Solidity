// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;

    address public manager;

    uint public minimumContribution;

    mapping(address => bool) public approvers;

    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);

        _;
    }

    constructor(uint _minimum, address _creator) {
        manager = _creator;

        minimumContribution = _minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;

        approversCount++;
    }

    function createRequest(
        string memory _description,
        uint _value,
        address _recipient
    ) public restricted {
        Request storage newRequest = requests.push();

        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint _index) public {
        Request storage request = requests[_index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint _index) public restricted {
        Request storage request = requests[_index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
