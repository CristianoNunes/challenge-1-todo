import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function existsTask(newTaskTitle: string) {
    const taskFound = tasks.find(task => task.title === newTaskTitle);
    if(taskFound?.title == null || undefined){
      return false;
    } else {
      return true;
    }
  }

  function handleAddTask(newTaskTitle: string) {
    if(existsTask(newTaskTitle)){
      return Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome')
    }
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskFound =updatedTasks.find(task => task.id === id);
    if(taskFound){
      taskFound.done = !taskFound.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter(task => task.id !== id)
    setTasks(newTaskList);
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