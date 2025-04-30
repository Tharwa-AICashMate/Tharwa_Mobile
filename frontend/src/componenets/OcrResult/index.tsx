// import React from 'react'
// import { ScrollView, TextInput, TouchableOpacity } from 'react-native'
// import { KeyboardAvoidingView, Modal, Text, View } from 'react-native'

// function OcrResult() {
//   return (
//     <Modal
//     animationType="slide"
//     transparent={true}
//     visible={modalVisible}
//     onRequestClose={() => setModalVisible(false)}
//   >
//     <KeyboardAvoidingView 
//       style={modalStyles.centeredView}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
//     >
//       <View style={modalStyles.modalContent}>
//         <View style={modalStyles.modalHeader}>
//           <Text style={modalStyles.modalTitle}>Receipt Details</Text>
//           <View style={modalStyles.headerButtons}>
//             <TouchableOpacity
//               style={modalStyles.editButton} 
//               onPress={toggleEditMode}
//             >
//               <Ionicons name={editMode ? "save-outline" : "pencil-outline"} size={22} color={Theme.colors?.primary || "#4CAF50"} />
//             </TouchableOpacity>
//             <TouchableOpacity 
//               style={modalStyles.closeIcon} 
//               onPress={() => setModalVisible(false)}
//             >
//               <Ionicons name="close" size={24} color="#666" />
//             </TouchableOpacity>
//           </View>
//         </View>
        
//         <ScrollView style={modalStyles.modalScrollView} contentContainerStyle={modalStyles.modalScrollContent}>
//           {editableResult && (
//             <>
//               <View style={modalStyles.receiptCard}>
//                 {renderEditableField("supplier_name", "Vendor", "business-outline")}
//                 {renderEditableField("invoice_date", "Date", "calendar-outline")}
//                 {renderEditableField("total_amount", "Amount", "cash-outline")}
                
//                 {/* Line items section */}
//                 {renderLineItems()}
                
//                 <View style={modalStyles.fieldContainer}>
//                   <View style={modalStyles.fieldLabelContainer}>
//                     <Ionicons name="document-text-outline" size={18} color="#666" style={modalStyles.fieldIcon} />
//                     <Text style={modalStyles.fieldLabel}>Description</Text>
//                   </View>
//                   <TextInput
//                     style={modalStyles.descriptionInput}
//                     placeholder="Add a description for this expense"
//                     value={description}
//                     onChangeText={setDescription}
//                     multiline={true}
//                     numberOfLines={3}
//                   />
//                 </View>
//               </View>

//               <View style={modalStyles.sectionTitleRow}>
//                 <View style={modalStyles.sectionTitle}>
//                   <Ionicons name="list-outline" size={20} color="#555" />
//                   <Text style={modalStyles.sectionTitleText}>Choose Category</Text>
//                 </View>
//                 <TouchableOpacity 
//                   style={modalStyles.addCategoryButton}
//                   onPress={() => setNewCategoryModalVisible(true)}
//                 >
//                   <Ionicons name="add-circle-outline" size={20} color={Theme.colors?.primary || "#4CAF50"} />
//                   <Text style={modalStyles.addCategoryText}>New</Text>
//                 </TouchableOpacity>
//               </View>

//               {categoriesLoading ? (
//                 <View style={modalStyles.loadingContainer}>
//                   <ActivityIndicator size="small" color={Theme.colors?.primary || "#4CAF50"} />
//                   <Text style={modalStyles.loadingText}>Loading categories...</Text>
//                 </View>
//               ) : categories.length === 0 ? (
//                 <View style={modalStyles.emptyContainer}>
//                   <Text style={modalStyles.emptyText}>No categories found</Text>
//                   <TouchableOpacity 
//                     style={modalStyles.createFirstCategoryButton}
//                     onPress={() => setNewCategoryModalVisible(true)}
//                   >
//                     <Text style={modalStyles.createFirstCategoryText}>Create your first category</Text>
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <ScrollView 
//                   horizontal 
//                   showsHorizontalScrollIndicator={false} 
//                   style={modalStyles.categoriesContainer}
//                   contentContainerStyle={modalStyles.categoriesContent}
//                 >
//                   {categories.map((category) => (
//                     <TouchableOpacity
//                       key={category.id}
//                       style={[
//                         modalStyles.categoryItem,
//                         selectedCategory?.id === category.id && modalStyles.selectedCategory
//                       ]}
//                       onPress={() => setSelectedCategory(category)}
//                     >
//                       <Ionicons 
//                         name={category.icon as any} 
//                         size={24} 
//                         color={selectedCategory?.id === category.id ? "#fff" : "#666"} 
//                       />
//                       <Text 
//                         style={[
//                           modalStyles.categoryText,
//                           selectedCategory?.id === category.id && modalStyles.selectedCategoryText
//                         ]}
//                         numberOfLines={2}
//                         ellipsizeMode="tail"
//                       >
//                         {category.name}
//                       </Text>
//                       {selectedCategory?.id === category.id && (
//                         <View style={modalStyles.checkmarkIcon}>
//                           <Ionicons name="checkmark-circle" size={16} color="#fff" />
//                         </View>
//                       )}
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               )}
//             </>
//           )}
//         </ScrollView>
        
//         <View style={modalStyles.buttonContainer}>
//           <TouchableOpacity 
//             style={[
//               modalStyles.addButton,
//               (!selectedCategory || categories.length === 0 || isCreatingTransaction) && modalStyles.disabledButton
//             ]}
//             onPress={handleAddTransaction}
//             disabled={isCreatingTransaction || !selectedCategory || categories.length === 0}
//           >
//             {isCreatingTransaction ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <>
//                 <Ionicons name="add-circle-outline" size={20} color="#fff" style={modalStyles.buttonIcon} />
//                 <Text style={modalStyles.buttonText}>Add Transaction</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   </Modal>
//   )
// }

// export default OcrResult