import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import LabelInput from "@/components/LabelInput";
import { CREATE_NEW_USER } from "@/graphql/mutations/createUser";
import { CREATE_USER_ORG } from "@/graphql/mutations/createUserOrg";
import modalStore from "@/globalStore/modalStore";
import { generateMockFirebaseId } from "@/utils/firebaseIdGenerator";
import { parseCSVToJson } from "@/utils/csvParser";
import UserAddedModal from "./UserAddedModal";
import { getOrgIdFromClaims } from "@/utils/claims";

const AddUsersModal: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const { closeModal, setModalTransitionCallback, openModal } = modalStore();

  const [createNewUser, { loading: userLoading, error: userError }] =
    useMutation(CREATE_NEW_USER);
  const [createUserOrg, { loading: orgLoading, error: orgError }] =
    useMutation(CREATE_USER_ORG);

  // Reference for the hidden file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler to parse CSV when file selected
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const parsedData = await parseCSVToJson(file);
        const transformedData = parsedData.map((row: any) => ({
          full_name: row.Name,
          email: row.Email,
          phone_number: row["Phone Number"],
          firebase_id: generateMockFirebaseId(),
        }));

        const orgId = await getOrgIdFromClaims();

        const createUserResponse = await createNewUser({
          variables: {
            objects: transformedData,
          },
        });

        const insertedUsers = createUserResponse.data?.insert_users?.returning;

        if (!insertedUsers || insertedUsers.length === 0) {
          throw new Error("No users were created.");
        }

        const userOrgObjects = insertedUsers.map((user: any) => ({
          user_id: user.id,
          organization_id: orgId
        }));

        const insertedOrgUsers = await createUserOrg({
          variables: {
            objects: userOrgObjects,
          },
        });

        const org_users =
          insertedOrgUsers.data?.insert_user_organizations?.returning;

        setModalTransitionCallback(() =>
          openModal(() => <UserAddedModal data={org_users} />)
        );
        closeModal();
      } catch (error) {
        console.error("Error while processing CSV upload:", error);
      }
    }
  };

  // Trigger file input click
  const handleUploadCSV = () => {
    fileInputRef.current?.click();
  };

  const handleAddUser = async () => {
    if (!name || !email) return;

    try {
      const { data } = await createNewUser({
        variables: {
          objects: [
            {
              full_name: name,
              email: email,
              phone_number: `+91${phoneNo}`,
              firebase_id: generateMockFirebaseId(),
            },
          ],
        },
      });

      const createdUserId = data?.insert_users?.returning?.[0]?.id;
      if (!createdUserId) throw new Error("User creation failed.");

      const orgId = await getOrgIdFromClaims();

      await createUserOrg({
        variables: {
          objects: [
            {
              user_id: createdUserId,
              organization_id: orgId,
            },
          ],
        },
      });

      setName("");
      setEmail("");
      setPhoneNo("");
      closeModal();
    } catch (err) {
      console.error("Error creating user or assigning org:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-xl">Add Users</h1>
      <p className="text-sm text-gray-400">
        Please Enter the New User's Details
      </p>

      <div className="flex flex-col gap-y-2 mt-4">
        <LabelInput
          id="name"
          type="text"
          placeholder="Full Name"
          label="Enter Name"
          className="w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LabelInput
          id="email"
          type="text"
          className="w-96"
          placeholder="Example@example.com"
          label="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LabelInput
          id="phone"
          type="text"
          className="w-96"
          placeholder="XXXX XX XXXX"
          label="Phone Number"
          value={phoneNo}
          onChange={(e) => {
            const value = e.target.value;
            // Only allow digits (0-9)
            if (/^\d*$/.test(value)) {
              setPhoneNo(value);
            }
          }}
        />
      </div>

      <div className="mt-4 flex justify-between w-full">
        <button
          onClick={handleUploadCSV}
          className="bg-btn-secondary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          Upload CSV
        </button>
        <button
          onClick={handleAddUser}
          disabled={userLoading || orgLoading}
          className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          {userLoading || orgLoading ? "Adding..." : "Add"}
        </button>
      </div>

      {(userError || orgError) && (
        <p className="text-red-500 text-sm mt-2">
          Error: {userError?.message || orgError?.message}
        </p>
      )}

      {/* Hidden file input for CSV upload */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default AddUsersModal;
