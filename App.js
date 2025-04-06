import React, { useState } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Contact } from './Contact';

const App = () => {
  const [contacts, setContacts] = useState([
    new Contact('Raza ', '1234567890', 'Family'),
    new Contact('Ali', '9876543210', 'Family'),
    new Contact('Hassan', '5551234567', 'Friends'),
    new Contact('Muhammad', '7654321098', 'Friends'),
    new Contact('Bilal', '9012345678', 'Work'),
    new Contact('Uzair', '1112223333', 'Work'),
    new Contact('Ahmed', '4445556666', 'Family'),
    new Contact('Subhan', '7778889999', 'Friends'),
    new Contact('Hammad', '2223334444', 'Work'),
    new Contact('Hasnain', '6667778888', 'Family'),
   
  ]);

  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const filterContacts = (text) => {
    setSearchTerm(text);
    const filtered = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(text.toLowerCase()) || contact.number.includes(text);
    });
    setFilteredContacts(filtered);
  };

  const groupContacts = () => {
    const groups = {};
    filteredContacts.forEach((contact) => {
      if (!groups[contact.group]) {
        groups[contact.group] = [];
      }
      groups[contact.group].push(contact);
    });
    return Object.keys(groups).map((group) => ({ title: group, data: groups[group] }));
  };

  const showContactDetails = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={searchTerm}
        onChangeText={filterContacts}
        placeholder="Search contact"
      />
      <SectionList
        sections={groupContacts()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => showContactDetails(item)}>
            <Text>{item.name}</Text>
            <Text>{item.number}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
        keyExtractor={(item) => item.number}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <Text>{selectedContact?.name}</Text>
          <Text>{selectedContact?.number}</Text>
          <Text>{selectedContact?.group}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default App;
