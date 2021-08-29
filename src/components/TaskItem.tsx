import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';


import trashIcon from '../assets/icons/trash/trash.png'
import EditIcon from '../assets/icons/edit/pen-edit.png'

type Task = {
  id: number,
  title: string,
  done: boolean
}

interface TaskItemProps {
  item: Task
  index: number
  editTask: (id: number, title: string) => void
  removeTask: (id: number) => void
  toggleTaskDone: (id: number) => void
}

export function TaskItem({ item, index, editTask, removeTask, toggleTaskDone }: TaskItemProps) {

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(item.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setNewTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle)
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return(
    <View style={{flexDirection: "row", alignItems:"center", flex:1, justifyContent:"space-between"}}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={item.done? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            //TODO - use style prop
            style={item.done? styles.taskTextDone : styles.taskText }
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerIcons}>
        {isEditing ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
            //TODO - use onPress (remove task) prop
          >
           <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>

        ):(
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
            //TODO - use onPress (remove task) prop
          >
            <Image source={EditIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divider} />


        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(item.id)}
          disabled= { isEditing? true : false}
          activeOpacity={ isEditing? 0.2 : 1}
          //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
        
          
        
      </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  containerIcons:{
    flexDirection: "row",
    height: 24,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: -10
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})