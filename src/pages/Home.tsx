import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = [...tasks]

    const existsTask = newTasks.find(task => {
      if(task.title === newTaskTitle) return true
    })
    
    if(existsTask){
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    newTasks.push(newTask)

    setTasks(newTasks)
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks]
    
    newTasks.find(task => {
      if(task.id === id){
        task.done=!task.done;
      }})

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    let newTasks = [...tasks]

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {newTasks = newTasks.filter(task => task.id !== id);

          setTasks(newTasks);},
          style: "cancel"
        },
        { text: "Não", onPress: () => setTasks(newTasks) }
      ]
    );

    
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const newTasks = [...tasks]

    newTasks.find(task => {
      if(task.id === taskId){
        task.title = taskNewTitle
      }
    })

    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})