"use client"

import React from "react";
import {ResourceType} from "@/lib/planetscale";
import Resource from "@/app/components/Resource";

interface ResourceListProps {
  resources: ResourceType[];
  onSelect: (ResourceType) => void;
}

const ResourceList = ({ resources, onSelect } : ResourceListProps) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>resources</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <Resource key={resource.id} resource={resource} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceList;
