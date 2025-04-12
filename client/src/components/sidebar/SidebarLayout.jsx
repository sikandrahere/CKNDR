import React, { useState } from 'react'; // Import useState

const SidebarLayout = ({ children }) => {


  return (
    <div>
        <main>
          {children}
        </main>
    </div>
  );
};

export default SidebarLayout;