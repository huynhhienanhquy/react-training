export default function ProductCard({
  product,
  isOpen,
  onToggle,
  onBuy,
}) {

  function handleCardClick() {
    alert(product.name);
  }

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: "1px solid gray",
        marginBottom: 20,
        padding: 15,
        cursor: "pointer",
      }}
    >
      <h2>{product.name}</h2>

      <p>${product.price}</p>

      {/* Conditional Rendering */}
      {product.inStock ? (
        <p style={{ color: "green" }}>
          In Stock ✅
        </p>
      ) : (
        <p style={{ color: "red" }}>
          Out of Stock ❌
        </p>
      )}

      {/* && */}
      {product.inStock && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBuy(product);
          }}
        >
          Buy Now
        </button>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {isOpen ? "Hide Detail" : "Show Detail"}
      </button>

      {/* Conditional Rendering */}
      {isOpen && (
        <div style={{ marginTop: 10 }}>
          <hr />
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}
