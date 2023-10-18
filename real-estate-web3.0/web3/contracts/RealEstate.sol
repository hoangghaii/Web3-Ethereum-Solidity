// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

contract RealEstate {
    /** -------------------- STATE VARIABLES -------------------- */

    // Property state vairables

    struct Property {
        uint256 productId;
        address owner;
        uint256 price;
        string propertyTitle;
        string category;
        string images;
        string propertyAddress;
        string description;
        address[] reviewers;
        string[] reviews;
    }

    address payable public contractOwner;

    uint256 public listingPrice = 0.025 ether;

    mapping(uint256 => Property) private properties; // productId => Property

    uint256 public propertyIndex;

    event PropertyListed(
        uint256 indexed id,
        address indexed owner,
        uint256 price
    );

    event PropertySold(
        uint256 indexed id,
        address indexed oldOwner,
        address indexed newOwner,
        uint256 price
    );

    event PropertyResold(
        uint256 indexed id,
        address indexed oldOwner,
        address indexed newOwner,
        uint256 price
    );

    // Reviews state vairables

    struct Review {
        address reviewer;
        uint256 productId;
        uint256 rating;
        string comment;
        uint256 likes;
        uint256 reviewIndex;
    }

    struct Product {
        uint256 productId;
        uint256 totalRating;
        uint256 numReviews;
    }

    mapping(uint256 => Review[]) private reviews; // productId => Review[]

    mapping(address => uint256[]) private userReviews; // userAddress => productId[]

    mapping(uint256 => Product) private products; // productId => Product

    uint256 public reviewsCounter;

    event ReviewAdded(
        uint256 indexed productId,
        address indexed reviewer,
        uint256 rating,
        string comment
    );

    event ReviewLiked(
        uint256 indexed productId,
        uint256 indexed reviewIndex,
        address indexed liker,
        uint256 likes
    );

    /** -------------------- CONSTRUCTER -------------------- */
    constructor() {
        contractOwner = payable(msg.sender);
    }

    /** -------------------- MODIFIERS -------------------- */
    modifier onlyContractOwner() {
        require(
            msg.sender == contractOwner,
            "Only owner of the contract can change this property"
        );

        _;
    }

    /** -------------------- FUNCTIONS -------------------- */

    // Property functions

    function addProperty(
        address _owner,
        uint256 _price,
        string memory _propertyTitle,
        string memory _category,
        string memory _images,
        string memory _propertyAddress,
        string memory _description
    ) external {
        require(
            _price >= listingPrice,
            "Price must be greater than listing price"
        );

        uint256 productId = propertyIndex;

        Property storage property = properties[productId];

        property.productId = productId;

        property.owner = _owner;

        property.price = _price;

        property.propertyTitle = _propertyTitle;

        property.category = _category;

        property.images = _images;

        property.propertyAddress = _propertyAddress;

        property.description = _description;

        emit PropertyListed(productId, _owner, _price);

        propertyIndex++;
    }

    function updateProperty(
        uint256 _productId,
        string memory _propertyTitle,
        string memory _category,
        string memory _images,
        string memory _propertyAddress,
        string memory _description
    ) external {
        Property storage property = properties[_productId];

        require(
            property.owner == msg.sender,
            "Your are not the owner of this property"
        );

        property.propertyTitle = _propertyTitle;

        property.category = _category;

        property.images = _images;

        property.propertyAddress = _propertyAddress;

        property.description = _description;
    }

    function updatePrice(uint256 _productId, uint256 _price) external {
        Property storage property = properties[_productId];

        require(
            property.owner == msg.sender,
            "Your are not the owner of this property"
        );

        require(
            _price >= listingPrice,
            "Price must be greater than listing price"
        );

        property.price = _price;
    }

    function buyProperty(uint256 _productId, address _buyer) external payable {
        uint256 amount = msg.value;

        Property storage property = properties[_productId];

        require(amount >= property.price, "Insufficient funds");

        (bool success, ) = payable(property.owner).call{value: amount}("");

        if (success) {
            emit PropertySold(_productId, property.owner, _buyer, amount);

            property.owner = _buyer;
        }
    }

    function getAllProperties() public view returns (Property[] memory) {
        uint256 itemCount = propertyIndex;

        uint256 currentIndex = 0;

        Property[] memory items = new Property[](itemCount); // Create a new dynamic array with size of itemCount

        for (uint256 i = 0; i < itemCount; i++) {
            Property storage currentItem = properties[i];

            items[currentIndex] = currentItem;

            currentIndex++;
        }

        return items;
    }

    function getProperty(
        uint256 _productId
    ) external view returns (Property memory) {
        Property storage property = properties[_productId];

        return property;
    }

    function getUserProperties(
        address _user
    ) external view returns (Property[] memory) {
        uint256 totalItemCount = propertyIndex;

        uint256 itemCount = 0;

        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            Property storage currentItem = properties[i];

            if (currentItem.owner == _user) {
                itemCount++;
            }
        }

        Property[] memory items = new Property[](itemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (properties[i].owner == _user) {
                Property storage currentItem = properties[i];

                items[currentIndex] = currentItem;

                currentIndex++;
            }
        }

        return items;
    }

    // Reviews functions

    function addReview(
        uint256 _productId,
        uint256 _rating,
        string calldata _comment,
        address _user
    ) external {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        Property storage property = properties[_productId];

        property.reviewers.push(_user);

        property.reviews.push(_comment);

        // Create a new review
        Review memory review = Review({
            reviewer: _user,
            productId: _productId,
            rating: _rating,
            comment: _comment,
            likes: 0,
            reviewIndex: reviewsCounter
        });

        // Add review to reviews mapping
        reviews[_productId].push(review);

        reviewsCounter++;

        // Add productId to userReviews mapping
        userReviews[_user].push(_productId);

        // Update product rating and numReviews
        products[_productId].totalRating += _rating;
        products[_productId].numReviews += 1;

        emit ReviewAdded(_productId, _user, _rating, _comment);
    }

    function getProductReviews(
        uint256 _productId
    ) external view returns (Review[] memory) {
        return reviews[_productId];
    }

    function getUserReviews(
        address _user
    ) external view returns (Review[] memory) {
        Review[] memory userProductReviews = new Review[](
            userReviews[_user].length
        );

        for (uint256 i = 0; i < userReviews[_user].length; i++) {
            uint256 productId = userReviews[_user][i];

            for (uint256 j = 0; j < reviews[productId].length; j++) {
                Review memory review = reviews[productId][j];

                if (review.reviewer == _user) {
                    userProductReviews[i] = review;
                }
            }
        }

        return userProductReviews;
    }

    function likeReview(
        uint256 _productId,
        uint256 _reviewIndex,
        address _liker
    ) external {
        Review storage review = reviews[_productId][_reviewIndex];

        review.likes++;

        emit ReviewLiked(_productId, _reviewIndex, _liker, review.likes);
    }

    function getHighestRatedProduct() external view returns (uint256) {
        uint256 highestRating = 0;

        uint256 highestRatedProductId = 0;

        for (uint256 i = 0; i < reviewsCounter; i++) {
            if (products[i].numReviews > 0) {
                uint256 avgRating = products[i].totalRating /
                    products[i].numReviews;

                if (avgRating > highestRating) {
                    highestRating = avgRating;

                    highestRatedProductId = products[i].productId;
                }
            }
        }

        return highestRatedProductId;
    }

    // Get listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Updates the listing price of the contract
    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyContractOwner {
        listingPrice = _listingPrice;
    }
}
