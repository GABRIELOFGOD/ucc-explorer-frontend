import { useState, useEffect } from 'react';
import { getValidators } from '../utils/api'; // Using validators as sample address data
import Link from 'next/link';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getValidators(); // Using validators as sample address data
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <div className="main-content">
      <div className="top-nav">
        <div className="search-container">
          <div className="search-bar">
            <FaSearch className='search-icon' />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by Address / Txn Hash / Block"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                }
              }}
            />
          </div>
        </div>
        <div className="network-indicator">
          <div className="status-dot"></div>
          <div className="network-name">Testnet</div>
        </div>
      </div>
      
      <div className="page-header">
        <h1 className="page-title">Addresses</h1>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <div className="table-title">Address List</div>
        </div>
        
        {loading ? (
          <div className="detail-item">
            <div className="detail-icon">
              <FaSyncAlt />
            </div>
            <div className="detail-content">
              <div className="detail-label">Loading addresses...</div>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Balance</th>
                  <th>Txn Count</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {addresses.map((address, index) => (
                  <tr key={index}>
                    <td>
                      <div className="hash-row">
                        <div className="address-icon">
                          A{index + 1}
                        </div>
                        <div className="address-details">
                          <div className="address-label">{address.name}</div>
                          <div className="address-hash">
                            {address.address.substring(0, 6)}...{address.address.substring(address.address.length - 4)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="amount-value">
                        {Math.floor(Math.random() * 10000).toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })} tUCC
                      </div>
                    </td>
                    <td>
                      <div className="amount-value">{Math.floor(Math.random() * 100)}</div>
                    </td>
                    <td>
                      <div className="hash-text">{Math.floor(Math.random() * 60)} seconds ago</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}