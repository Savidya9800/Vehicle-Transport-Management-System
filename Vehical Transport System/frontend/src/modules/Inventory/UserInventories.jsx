import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin, message } from "antd";
import inventoryService from "../../services/inventoryService";
import "./UserInventories.css"; // Keep custom CSS for scrolling

const { Meta } = Card;

const UserInventories = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch inventory items from the service
  const fetchItems = async () => {
    try {
      const data = await inventoryService.getAllItems();
      setItems(data);
    } catch (error) {
      message.error("Failed to load inventory items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-5"> {/* Replaced .inventory-container styles with Tailwind classes */}
      {loading ? (
        <Spin tip="Loading inventories..." />
      ) : (
        <div className="max-h-[600px] overflow-y-scroll scrollbar-hide"> {/* Tailwind classes for scrolling container */}
          <Row gutter={[16, 16]}>
            {items.map((item) => (
              <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  title={item.Item_Name}
                  bordered={true}
                  className="w-full" // Use Tailwind for width
                >
                  <Meta
                    description={
                      <div>
                        <p>
                          <strong>Item ID:</strong> {item.Item_ID}
                        </p>
                        <p>
                          <strong>Size:</strong> {item.Size}
                        </p>
                        <p>
                          <strong>Type:</strong> {item.Type}
                        </p>
                        <p>
                          <strong>Price:</strong> ${item.Price}
                        </p>
                        <p>
                          <strong>Stock Count:</strong> {item.Stock_Count}
                        </p>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default UserInventories;
