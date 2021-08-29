import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTasks = [...tasks]
    
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
    
    newTasks.forEach(task => {
      if(task.id === id){
        task.done = !task.done
      }
    })

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    let newTasks = [...tasks]
    newTasks = newTasks.filter(task => task.id !== id);

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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